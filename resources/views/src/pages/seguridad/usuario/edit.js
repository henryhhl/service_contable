
import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { Button, Card, Col, Row } from 'antd';

import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

function UsuarioEdit() {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <>
            <UsuarioEditPrivate 
                navigate={navigate}
                params={params}
            />
        </>
    );
};

class UsuarioEditPrivate extends Component {

    constructor( props) {
        super( props );
        this.state = {
            visible_store: false,
            loading: false,
            disabled: false,

            showPassword: false,

            nombre: "",
            apellido: "",
            email: "",
            login: "",
            password: "",
            imagen: "",

            errornombre: false,
            errorapellido: false,
            erroremail: false,
            errorlogin: false,
            errorpassword: false,
        };
    };
    componentDidMount() {
        this.get_data();
    };
    get_data( ) {
        axios.get( "/api/usuario/edit/" + this.props.params.idusuario ) . then ( ( resp ) => {
            console.log(resp)
            if ( resp.data.rpta === 1 ) {
                this.setState( {
                    nombre: resp.data.usuario.nombre,
                    apellido: resp.data.usuario.apellido,
                    email: resp.data.usuario.email,
                    login: resp.data.usuario.login,
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
    onChangeNombre( evt ) {
        this.setState( {
            nombre: evt.target.value,
            errornombre: false,
        } );
    };
    onChangeApellido( evt ) {
        this.setState( {
            apellido: evt.target.value,
            errorapellido: false,
        } );
    };
    onChangeEmail( evt ) {
        this.setState( {
            email: evt.target.value,
            erroremail: false,
        } );
    };
    onChangePassword( evt ) {
        this.setState( {
            password: evt.target.value,
            errorpassword: false,
        } );
    };
    onValidate() {
        let isvalidate = false;
        if ( this.state.nombre.toString().trim().length === 0 ) {
            this.setState( { errornombre: true, } );
            isvalidate = true;
        }
        if ( this.state.apellido.toString().trim().length === 0 ) {
            this.setState( { errorapellido: true, } );
            isvalidate = true;
        }
        if ( this.state.email.toString().trim().length === 0 ) {
            this.setState( { erroremail: true, } );
            isvalidate = true;
        }
        if ( this.state.password.toString().trim().length === 0 ) {
            this.setState( { errorpassword: true, } );
            isvalidate = true;
        }
        if ( this.state.password.toString().trim().length < 6 ) {
            this.setState( { errorpassword: true, } );
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Campo Contraseña se permite 6 caracteres minimo.',
                showConfirmButton: false,
                timer: 4000
            } );
            return;
        }
        if ( isvalidate ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Existe campo requerido por llenar',
                showConfirmButton: false,
                timer: 1500
            } );
            return;
        }
        this.onStore();
    }
    onStore() {
        let body = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            apellido: this.state.apellido,
            password: this.state.password,
            idusers: this.props.params.idusuario,
        };
        this.setState( { disabled: true, } );
        axios.post( "/api/usuario/update", body ) . then ( ( resp ) => {
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
                this.props.navigate('/usuario/index');
                return;
            }
            if ( resp.data.rpta === 0 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'error',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                } );
                return;
            }
            if ( resp.data.rpta === -1 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'warning',
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                } );
                return;
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
            this.setState( { disabled: false, } );
        } );
    }
    onBack() {
        this.props.navigate( "/usuario/index" );
    };
    render() {
        return (
            <>
                <Card title={"EDITAR USUARIO"} bordered 
                    extra={ 
                        <Button type="primary" danger
                            onClick={this.onBack.bind(this)}
                        >
                            Atras
                        </Button> 
                    }
                    style={{ minWidth: '100%', width: '100%', maxWidth: '100%', }}
                >
                    <Row gutter={[16, 24]}>
                        <Col xs={{ span: 24, }} sm={ { span: 8, } } >
                            <TextField
                                fullWidth
                                label="Nombre" size="small"
                                value={this.state.nombre}
                                onChange={this.onChangeNombre.bind(this)}
                                error={this.state.errornombre}
                                helperText={ this.state.errornombre && "Campo requerido." }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={ { span: 16, } } >
                            <TextField
                                fullWidth
                                label="Apellido" size="small"
                                value={this.state.apellido}
                                onChange={this.onChangeApellido.bind(this)}
                                error={this.state.errorapellido}
                                helperText={ this.state.errorapellido && "Campo requerido." }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 20,} }>
                        <Col xs={{ span: 24, }} sm={ { span: 24, } } >
                            <TextField
                                fullWidth
                                label="Email" size="small"
                                value={this.state.email}
                                onChange={this.onChangeEmail.bind(this)}
                                error={this.state.erroremail}
                                helperText={ this.state.erroremail && "Campo requerido." }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 20,} }>
                        <Col sm={ { span: 4, } } ></Col>
                        <Col xs={{ span: 24, }} sm={ { span: 8, } } >
                            <TextField
                                fullWidth
                                label="Usuario" size="small"
                                value={this.state.login}
                                InputProps={ {
                                    readOnly: true,
                                } }
                                disabled={true}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={ { span: 8, } } >
                            <TextField
                                fullWidth type={ this.state.showPassword ? 'text' : 'password' }
                                label="Contraseña" size="small"
                                value={this.state.password}
                                onChange={this.onChangePassword.bind(this)}
                                error={this.state.errorpassword}
                                helperText={ this.state.errorpassword && "Campo requerido." }
                                InputProps={ {
                                    endAdornment: 
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ () => this.setState( { showPassword: !this.state.showPassword } ) }
                                            onMouseDown={ (evt) => evt.preventDefault() }
                                            edge="end"
                                          >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                    
                                } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]} style={ { marginTop: 20,} } justify='center'>
                        <Button danger style={ { marginRight: 5, } }
                            onClick={this.onBack.bind(this)} disabled={this.state.disabled}
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

export default UsuarioEdit;
