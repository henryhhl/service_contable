
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Button, Card, Col, Row, Table, Transfer } from 'antd';

import { MenuItem, TextField } from '@mui/material';
import Swal from 'sweetalert2';

import ComponentModal from '../../components/modal';

function AsignarUsuario() {
    const navigate = useNavigate();
    return (
        <>
            <AsignarUsuarioPrivate 
                navigate={navigate}
            />
        </>
    );
};

class AsignarUsuarioPrivate extends Component {

    constructor( props) {
        super( props );
        this.state = {
            visible_store: false,
            visible_grupousuario: false,

            loading: false,
            disabled: true,

            fkidgrupousuario: "",
            grupousuario: "",
            array_grupousuario: [],
            arrayUsuarioConGrupoUsuario: [],
            arrayUsuarioSinGrupoUsuario: [],
        };
        this.columns_grupousuario = [ 
            {
                title: 'Còdigo',
                dataIndex: 'idgrupousuario',
                key: 'idgrupousuario',
            },
            {
                title: 'Descripón',
                dataIndex: 'descripcion',
                key: 'descripcion',
            },
        ];
    };
    componentDidMount() {
        this.get_data();
    };
    get_data() {};
    get_usuario(grupousuario, evt) {
        this.setState( { loading: true, } );
        axios.get( "/api/grupousuario/getusuario/" + grupousuario.idgrupousuario ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                let array = [];
                for (let index = 0; index < resp.data.arrayUsuarioConGrupoUsuario.length; index++) {
                    const element = resp.data.arrayUsuarioConGrupoUsuario[index];
                    resp.data.arrayUsuarioSinGrupoUsuario.push(element);
                    array.push(element.key);
                }
                this.setState( {
                    fkidgrupousuario: grupousuario.idgrupousuario,
                    grupousuario: grupousuario.descripcion,
                    disabled: false,
                    arrayUsuarioConGrupoUsuario: array,
                    arrayUsuarioSinGrupoUsuario: resp.data.arrayUsuarioSinGrupoUsuario,
                } );
                setTimeout(() => {
                    this.setState( { visible_grupousuario: false, } );
                }, 500);
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
        } ) . finally ( () => {
            this.setState( { loading: false, } );
        } );
    };
    get_grupousuario() {
        axios.get( "/api/grupousuario/index" ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                this.setState( {
                    array_grupousuario: resp.data.arrayGrupoUsuario,
                    visible_grupousuario: true,
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
    onVisibleGrupoUsuario() {
        this.get_grupousuario();
    }

    onValidate() {
        if ( this.state.descripcion.toString().trim().length === 0 ) {
            this.setState( { errordescripcion: true, } );
            return;
        }
        this.onStore();
    }
    getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let mounth = date.getMonth() + 1;
        let day = date.getDate();
        return year + "-" + mounth + '-' + day;
    }
    getTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return hours + ':' + minutes + ':' + seconds;
    }
    onAsignar() {
        let body = {
            fkidgrupousuario: this.state.fkidgrupousuario,
            arrayUsuarioConGrupoUsuario: JSON.stringify(this.state.arrayUsuarioConGrupoUsuario),
            x_fecha: this.getDate(),
            x_hora: this.getTime(),
        };
        this.setState( { loading: true, } );
        axios.post( "/api/grupousuario/asignarusuario", body ) . then ( ( resp ) => {
            console.log(resp)
            this.setState( { disabled: false, } );
            if ( resp.data.rpta === 1 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'success',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500
                } );
                this.setState( { 
                    disabled: true,
                    fkidgrupousuario: "",
                    grupousuario: "",
                    array_grupousuario: [],
                    arrayUsuarioConGrupoUsuario: [],
                    arrayUsuarioSinGrupoUsuario: [],
                } );
                return;
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
            this.setState( { disabled: false, } );
        } ) . finally ( () => {
            this.setState( { loading: false, } );
        } );
    }
    onComponentGrupoUsuario() {
        return (
            <ComponentModal
                visible={this.state.visible_grupousuario}
                title={"GRUPO USUARIO"}
                onClose={ () => {
                    this.setState( { 
                        visible_grupousuario: false, 
                        fkidgrupousuario: "", grupousuario: "", 
                    } );
                } }
            >
                <Row gutter={[16, 24]}>
                    <Col xs={{ span: 24, }}>
                        <Table columns={this.columns_grupousuario} dataSource={this.state.array_grupousuario} 
                            bordered style={ { width: '100%', minWidth: '100%', padding: 15, paddingTop: 10, paddingBottom: 10, } } 
                            pagination={false} size='small' rowKey={"idgrupousuario"}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: this.get_usuario.bind(this, record), // click row
                                    onDoubleClick: event => {}, // double click row
                                    onContextMenu: event => {}, // right button click row
                                    onMouseEnter: event => {}, // mouse enter row
                                    onMouseLeave: event => {}, // mouse leave row
                                };
                            }}
                        />
                    </Col>
                </Row>
            </ComponentModal>
        );
    };
    onLoading() {
        return (
            <ComponentModal
                visible={this.state.loading} zIndex={999999}
                keyboard={false} maskClosable={false} closable={false}
                width={100}
            >
                <Row gutter={[16, 24]} justify='center'>
                    Procesando...
                </Row>
            </ComponentModal>
        );
    }
    onLimpiar() {
        this.setState( { 
            disabled: true,
            fkidgrupousuario: "",
            grupousuario: "",
            array_grupousuario: [],
            arrayUsuarioConGrupoUsuario: [],
            arrayUsuarioSinGrupoUsuario: [],
        } );
    }
    render() {
        return (
            <>
                { this.onComponentGrupoUsuario() }
                { this.onLoading() }
                <Card title={"ASIGNAR USUARIO"} bordered
                    style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                >
                    <Row gutter={[16, 24]}>
                        <Col sm={{ span: 8, }}></Col>
                        <Col xs={{ span: 24, }} sm={ { span: 8, } } >
                            <TextField
                                fullWidth
                                label="Grupo Usuario" size="small"
                                value={this.state.fkidgrupousuario}
                                select={true}
                                InputProps={ {
                                    readOnly: true,
                                } }
                                onClick={this.onVisibleGrupoUsuario.bind(this)}
                                disabled={this.state.disabled}
                            >
                                <MenuItem value={this.state.fkidgrupousuario}>
                                    { this.state.grupousuario }
                                </MenuItem>
                            </TextField>
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 20,} }>
                        <Col xs={ { span: 24, } }>
                            <Transfer
                                dataSource={ this.state.arrayUsuarioSinGrupoUsuario }
                                targetKeys={ this.state.arrayUsuarioConGrupoUsuario }
                                onChange={ ( targetKeys ) => {
                                    this.setState( {
                                        arrayUsuarioConGrupoUsuario: targetKeys,
                                    } );
                                } } showSearch
                                titles={['Fuente', 'Objetivo']}
                                render={ item => item.title }
                                listStyle={ {
                                    width: '100%',
                                    height: 330,
                                } } disabled={this.state.disabled}
                                filterOption={ (inputValue, option) => {
                                    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
                                } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 20,} } justify='center'>
                        <Button danger style={ { marginRight: 5, } }
                            onClick={this.onLimpiar.bind(this)} disabled={this.state.disabled}
                        >
                            LimpiaR
                        </Button>
                        <Button type="primary" danger disabled={this.state.disabled}
                            onClick={this.onAsignar.bind(this)}
                        >
                            Asignar
                        </Button>
                    </Row>
                </Card>
            </>
        );
    }
};

export default AsignarUsuario;
