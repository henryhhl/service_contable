
import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './header';
import Sidebar from './sidebar';

import Home from '../home';

import PlanCuentaIndex from '../pages/plancuenta';

import GrupoUsuarioIndex from '../pages/seguridad/grupousuario';
import GrupoUsuarioCreate from '../pages/seguridad/grupousuario/create';
import GrupoUsuarioEdit from '../pages/seguridad/grupousuario/edit';
import GrupoUsuarioShow from '../pages/seguridad/grupousuario/show';

import FormularioIndex from '../pages/seguridad/formulario';
import FormularioCreate from '../pages/seguridad/formulario/create';
import FormularioEdit from '../pages/seguridad/formulario/edit';
import FormularioShow from '../pages/seguridad/formulario/show';

import UsuarioIndex from '../pages/seguridad/usuario';
import UsuarioCreate from '../pages/seguridad/usuario/create';
import UsuarioEdit from '../pages/seguridad/usuario/edit';
import UsuarioShow from '../pages/seguridad/usuario/show';

import AsignarUsuario from '../pages/seguridad/asignarusuario';

function AppMain() {
    return (
        <AppMainPrivate />
    );
};

class AppMainPrivate extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };
    componentDidMount() {
        this.get_data();
    };
    get_data() {};

    render() {
        return (
            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                    <Header />

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">
                            
                            <Sidebar />
                            
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            
                                            <Routes>
                                                <Route path="/home" element={ <Home /> } />
                                                <Route path="/plancuenta/index" element={ <PlanCuentaIndex /> } />
                                                <Route path="/plancuentatipo/index" element={ <Home /> } />

                                                <Route path="/grupousuario/index" element={ <GrupoUsuarioIndex /> } />
                                                <Route path="/grupousuario/create" element={ <GrupoUsuarioCreate /> } />
                                                <Route path="/grupousuario/edit/:idgrupousuario" element={ <GrupoUsuarioEdit /> } />
                                                <Route path="/grupousuario/show/:idgrupousuario" element={ <GrupoUsuarioShow /> } />

                                                <Route path="/formulario/index" element={ <FormularioIndex /> } />
                                                <Route path="/formulario/create" element={ <FormularioCreate /> } />
                                                <Route path="/formulario/edit/:idformulario" element={ <FormularioEdit /> } />
                                                <Route path="/formulario/show/:idformulario" element={ <FormularioShow /> } />

                                                <Route path="/usuario/index" element={ <UsuarioIndex /> } />
                                                <Route path="/usuario/create" element={ <UsuarioCreate /> } />
                                                <Route path="/usuario/edit/:idusuario" element={ <UsuarioEdit /> } />
                                                <Route path="/usuario/show/:idusuario" element={ <UsuarioShow /> } />

                                                <Route path="/usuario/asignar" element={ <AsignarUsuario /> } />

                                            </Routes>

                                        </div>

                                        <div id="styleSelector">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AppMain;
