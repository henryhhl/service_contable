
import React, { Component } from 'react';
import Draggable from 'react-draggable';

import axios from 'axios';
import { Button, Card, Col, Modal, Row, Tooltip, Tree } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';

import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

function PlanCuentaIndex() {
    return (
        <>
            <PlanCuentaIndexPrivate />
        </>
    );
};

class PlanCuentaIndexPrivate extends Component {

    constructor( props) {
        super( props );
        this.state = {
            visible_create: false,
            visible_edit: false,
            visible_show: false,
            visible_delete: false,
            loading: false,
            tree_plancuenta: [],
            cuentaplan: null,

            draggable: false,
            bounds: { left: 0, top: 0, bottom: 0, right: 0 },

            codigo: "",
            descripcion: "",

            errorCodigo: false,
            errorDescripcion: false,
            fkidcuentaplanpadre: null,
        };
        this.draggleRef = React.createRef();
    };
    componentDidMount() {
        this.get_data();
    };
    get_data() {
        axios.get( "/api/cuentaplan/index" ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                this.cargarTree(resp.data.arrayCuentaPlan);
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

    cargarTree( arrayCuentaPlan ) {
        let array = [];
        for (let index = 0; index < arrayCuentaPlan.length; index++) {
            const element = arrayCuentaPlan[index];
            if ( element.fkidcuentaplanpadre === null ) {
                const detalle = {
                    title: 
                        <span style={{ position: 'relative', top: 1, left: 3, paddingRight: 10, paddingBottom: 12, }}>
                            <Tooltip title="Opción">
                                <Button 
                                    icon={<MoreOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="blue" title="Nuevo">
                                <Button 
                                    icon={<PlusOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                    onClick={ () => {
                                        this.setState( {
                                            visible_create: true,
                                            fkidcuentaplanpadre: element.idcuentaplan,
                                        } );
                                    } }
                                />
                            </Tooltip>
                            <Tooltip color="green" title="Visualizar">
                                <Button 
                                    icon={<EyeOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="blue" title="Editar">
                                <Button 
                                    icon={<EditOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="red" title="Eliminar">
                                <Button 
                                    icon={<DeleteOutlined />} 
                                    size="small" style={{ marginRight: 4, }}
                                />
                            </Tooltip>
                            <span style={ { marginRight: 4, } }> { element.codigo } </span> 
                            <span> { element.descripcion } </span> 
                        </span>,
                    key: element.idcuentaplan,
                    idcuentaplan: element.idcuentaplan,
                    cuentaplan: element,
                    children: [],
                };
                array.push(detalle);
            }
        }
        this.treeCuentaPlan( array, arrayCuentaPlan );
        console.log(array)
        this.setState( {
            tree_plancuenta: array,
        } );
    };

    treeCuentaPlan( array, arrayCuentaPlan ) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const children = this.childrenCuentaPlan( element.idcuentaplan, arrayCuentaPlan );
            element.children = children;
            this.treeCuentaPlan( children, arrayCuentaPlan );
        }
    };
    childrenCuentaPlan( idpadre, arrayCuentaPlan ) {
        let children = [];
        for (let index = 0; index < arrayCuentaPlan.length; index++) {
            const element = arrayCuentaPlan[index];
            if ( element.fkidcuentaplanpadre === idpadre ) {
                const detalle = {
                    title: 
                        <span style={{ position: 'relative', top: 1, left: 3, paddingLeft: 10, paddingRight: 10, paddingBottom: 12, }}>
                            <Tooltip title="Opción">
                                <Button 
                                    icon={<MoreOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="blue" title="Nuevo">
                                <Button 
                                    icon={<PlusOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                    onClick={ () => {
                                        this.setState( {
                                            visible_create: true,
                                            fkidcuentaplanpadre: element.idcuentaplan,
                                        } );
                                    } }
                                />
                            </Tooltip>
                            <Tooltip color="green" title="Visualizar">
                                <Button 
                                    icon={<EyeOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="blue" title="Editar">
                                <Button 
                                    icon={<EditOutlined />} 
                                    size="small" style={{ marginRight: 2, }}
                                />
                            </Tooltip>
                            <Tooltip color="red" title="Eliminar">
                                <Button 
                                    icon={<DeleteOutlined />} 
                                    size="small" style={{ marginRight: 4, }}
                                />
                            </Tooltip>
                            <span style={ { marginRight: 4, } }> { element.codigo } </span> 
                            <span> { element.descripcion } </span> 
                        </span>,
                    key: element.idcuentaplan,
                    idcuentaplan: element.idcuentaplan,
                    cuentaplan: element,
                    children: [],
                };
                children.push(detalle);
            }
        }
        return children;
    };
    onChangeCodigo(evt) {
        this.setState( {
            codigo: evt.target.value,
            errorCodigo: false,
        } );
    };
    onChangeDescripcion(evt) {
        this.setState( {
            descripcion: evt.target.value,
            errorDescripcion: false,
        } );
    };

    onStart(event, uiData) {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = this.draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
          return;
        }
        this.setState( {
          bounds: {
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
          },
        } );
    };

    onValidate() {
        if ( this.state.codigo.toString().trim().length === 0 ) {
            this.setState( {
                errorCodigo: true,
            } );
            return;
        }
        if ( this.state.descripcion.toString().trim().length === 0 ) {
            this.setState( {
                errorDescripcion: true,
            } );
            return;
        }
        this.onStore();
    };
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
    onStore() {
        let body = {
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            fkidcuentaplanpadre: this.state.fkidcuentaplanpadre,
            nivel: 1,
            x_fecha: this.getDate(),
            x_hora: this.getTime(),
        };
        this.setState( { loading: true, } );
        console.log(body)
        axios.post( "/api/cuentaplan/store", body ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                this.setState( {
                    visible_create: false, codigo: "", descripcion: "", 
                    errorCodigo: false, errorDescripcion: false,
                    fkidcuentaplanpadre: null, loading: false,
                } );
                this.get_data();
                Swal.fire( {
                    position: 'top-end',
                    icon: 'success',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500
                } );
                return;
            }
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: resp.data.message,
                showConfirmButton: false,
                timer: 1500
            } );
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

    onComponentCreate() {
        return (
            <Modal
                title={
                    <div style={ { width: '100%', cursor: 'move', } }
                        onMouseOver={ () => {
                            if ( this.state.draggable ) {
                                this.setState({ draggable: false, });
                            }
                        }}
                        onMouseOut={() => {
                            this.setState({ draggable: true, });
                        }}
                    >
                        Nuevo Plan de Cuenta
                    </div>
                }
                okButtonProps={{ disabled: this.state.loading }}
                cancelButtonProps={{ disabled: this.state.loading }}
                keyboard={ !this.state.loading }
                maskClosable={ !this.state.loading }
                visible={this.state.visible_create}
                onOk={this.onValidate.bind(this)}
                onCancel={ () => {
                    this.setState( { 
                        visible_create: false, codigo: "", descripcion: "", 
                        errorCodigo: false, errorDescripcion: false,
                        fkidcuentaplanpadre: null,
                    } )
                } }
                modalRender={modal => (
                    <Draggable
                        disabled={this.state.draggable}
                        bounds={this.state.bounds}
                        onStart={ ( event, uiData) => this.onStart(event, uiData) }
                    >
                        <div ref={this.draggleRef}>{modal}</div>
                    </Draggable>
                )} cancelText="Cancelar" okText="Guardar" width={350}
                zIndex={99999}
            >
                 <Row gutter={[16, 24]}>
                    <Col xs={{ span: 24, }}>
                        <TextField
                            fullWidth
                            label="Código" size="small"
                            value={this.state.codigo}
                            onChange={this.onChangeCodigo.bind(this)}
                            error={this.state.errorCodigo}
                            helperText={ this.state.errorCodigo && "Campo requerido." }
                        />
                    </Col>
                    <Col xs={{ span: 24, }}>
                        <TextField
                            fullWidth
                            label="Descripción" size="small"
                            value={this.state.descripcion}
                            onChange={this.onChangeDescripcion.bind(this)}
                            error={this.state.errorDescripcion}
                            helperText={ this.state.errorDescripcion && "Campo requerido." }
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }

    render() {
        return (
            <>
                { this.onComponentCreate() }
                <div className="page-header">
                    <div className="row align-items-end">
                        <div className="col-lg-12">
                            <div className="page-header-title">
                                <div className="d-inline">
                                    <h4 style={{ fontWeight: 'bold', }}> PLAN DE CUENTA </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Card title={null} bordered
                    style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                >
                    <Row gutter={[16, 24]}>
                        <Col xs={{ span: 24, }}>
                            <Tree
                                showLine
                                // onSelect={onSelect}
                                // onExpand={onExpand}
                                treeData={this.state.tree_plancuenta}
                                style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                            />
                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
};

export default PlanCuentaIndex;
