
import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { Button, Card, Col, Row } from 'antd';

import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

function GrupoUsuarioEdit() {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <>
            <GrupoUsuarioEditPrivate 
                navigate={navigate}
                params={params}
            />
        </>
    );
};

class GrupoUsuarioEditPrivate extends Component {

    constructor( props) {
        super( props );
        this.state = {
            visible_store: false,
            loading: false,
            disabled: false,

            descripcion: "",
            nota: "",

            errordescripcion: false,
            errornota: false,
        };
    };
    componentDidMount() {
        this.get_data();
    };
    get_data( ) {
        axios.get( "/api/grupousuario/edit/" + this.props.params.idgrupousuario ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                this.setState( {
                    descripcion: resp.data.grupousuario.descripcion,
                    nota: resp.data.grupousuario.nota ? resp.data.grupousuario.nota : "",
                } );
            }
            if ( resp.data.rpta === -1 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'warning',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500
                } );
            }
            if ( resp.data.rpta === -5 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'error',
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
    onChangeDescripcion( evt ) {
        this.setState( {
            descripcion: evt.target.value,
            errordescripcion: false,
        } );
    };
    onChangeNota( evt ) {
        this.setState( {
            nota: evt.target.value,
            errornota: false,
        } );
    };
    onValidate() {
        if ( this.state.descripcion.toString().trim().length === 0 ) {
            this.setState( { errordescripcion: true, } );
            return;
        }
        this.onStore();
    }
    onStore() {
        let body = {
            descripcion: this.state.descripcion,
            nota: this.state.nota,
            idgrupousuario: this.props.params.idgrupousuario,
        };
        this.setState( { disabled: true, } );
        axios.post( "/api/grupousuario/update", body ) . then ( ( resp ) => {
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
                this.props.navigate('/grupousuario/index');
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
        } );
    }
    render() {
        return (
            <>
                <Card title={"EDITAR GRUPO USUARIO"} bordered 
                    extra={ 
                        <Button type="primary" danger
                            onClick={ ( evt ) => {
                                evt.preventDefault();
                                this.props.navigate( "/grupousuario/index" );
                            } }
                        >
                            Atras
                        </Button> 
                    }
                    style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                >
                    <Row gutter={[16, 24]}>
                        <Col sm={{ span: 8, }}></Col>
                        <Col xs={{ span: 24, }} sm={ { span: 8, } } >
                            <TextField
                                fullWidth
                                label="Descripción" size="small"
                                value={this.state.descripcion}
                                onChange={this.onChangeDescripcion.bind(this)}
                                error={this.state.errordescripcion}
                                helperText={ this.state.errordescripcion && "Campo requerido." }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 10,} }>
                        <Col xs={{ span: 24, }} sm={ { span: 24, } } >
                            <TextField
                                fullWidth multiline minRows={3}
                                label="Nota" size="small"
                                value={this.state.nota}
                                onChange={this.onChangeNota.bind(this)}
                                error={this.state.errornota}
                                helperText={ this.state.errornota && "Campo requerido." }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 10,} } justify='center'>
                        <Button danger style={ { marginRight: 5, } }
                            onClick={ ( evt ) => {
                                evt.preventDefault();
                                this.props.navigate( "/grupousuario/index" );
                            } } disabled={this.state.disabled}
                        >
                            Cancelar
                        </Button>
                        <Button type="primary" danger disabled={this.state.disabled}
                            onClick={this.onValidate.bind(this)}
                        >
                            Guardar
                        </Button>
                    </Row>
                </Card>
            </>
        );
    }
};

export default GrupoUsuarioEdit;
