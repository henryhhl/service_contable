
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Button, Card, Col, Row, Table, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

import Swal from 'sweetalert2';

function FormularioIndex() {
    const navigate = useNavigate();
    return (
        <>
            <FormularioIndexPrivate 
                navigate={navigate}
            />
        </>
    );
};

class FormularioIndexPrivate extends Component {

    constructor( props) {
        super( props );
        this.state = {
            visible_delete: false,
            loading: false,

            array_formulario: [],
            search: "",
            paginate: 10,
            page: 1,
            idformulario: null,
        };
        this.columns = [ 
            {
                title: 'Nro',
                dataIndex: 'nro',
                key: 'nro',
            },
            {
                title: 'Descripón',
                dataIndex: 'descripcion',
                key: 'descripcion',
            },
            {
                title: 'Nota',
                dataIndex: 'nota',
                key: 'nota',
            },
            {
                title: 'Acción',
                dataIndex: 'accion',
                render: (text, record) => {
                    return (
                        <>
                            <Tooltip title="editar">
                                <Button shape="circle" style={ { marginRight: 5, } }
                                    icon={<EditOutlined style={ { position: 'relative', top: -2, } } />} 
                                    onClick={ ( evt ) => {
                                        evt.preventDefault();
                                        this.props.navigate( "/formulario/edit/" + record.formulario.idformulario );
                                    } }
                                />
                            </Tooltip>
                            <Tooltip title="ver">
                                <Button shape="circle" style={ { marginRight: 5, } }
                                    icon={<EyeOutlined style={ { position: 'relative', top: -2, } } />} 
                                    onClick={ ( evt ) => {
                                        evt.preventDefault();
                                        this.props.navigate( "/formulario/show/" + record.formulario.idformulario );
                                    } }
                                />
                            </Tooltip>
                        </>
                    )
                },
            }
        ];
    };
    componentDidMount() {
        this.get_data();
    };
    get_data( search = "", paginate = 10, page = 1 ) {
        axios.get( "/api/formulario/index?page=" + page + "&search=" + search + "&paginate=" + paginate ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                let array = [];
                for (let index = 0; index < resp.data.arrayFormulario.length; index++) {
                    const element = resp.data.arrayFormulario[index];
                    let detalle = {
                        nro: index,
                        descripcion: element.descripcion,
                        nota: element.nota,
                        formulario: element,
                    };
                    array.push(detalle);
                }
                this.setState( {
                    array_formulario: array,
                } );
            }
            if ( resp.data.rpta === -5 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'warning',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500
                } );
            }

        } ) . catch ( ( error ) => {
            console.log(error);
            Swal.fire( {
                position: 'top-end',
                icon: 'error',
                title: 'Hubo problemas con el servidor',
                showConfirmButton: false,
                timer: 1500
            } );
        } );
    };

    render() {
        return (
            <>
                {/* <div className="page-header">
                    <div className="row align-items-end">
                        <div className="col-lg-12">
                            <div className="page-header-title">
                                <div className="d-inline">
                                    <h4 style={{ fontWeight: 'bold', }}> GRUPO USUARIO </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <Card title={"FORMULARIO"} bordered 
                    extra={ 
                        <Button type="primary" danger
                            onClick={ ( evt ) => {
                                evt.preventDefault();
                                this.props.navigate( "/formulario/create" );
                            } }
                        >
                            Nuevo
                        </Button> 
                    }
                    style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                >
                    <Row gutter={[16, 24]}>
                        <Col xs={{ span: 24, }}>
                            <Table columns={this.columns} dataSource={this.state.array_formulario} 
                                bordered style={ { width: '100%', minWidth: '100%', } } pagination={false}
                                size='small' rowKey={"nro"}
                            />
                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
};

export default FormularioIndex;
