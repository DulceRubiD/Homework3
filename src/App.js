import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Switch from 'react-router-dom/es/Switch';
import Topbar from './components/Topbar/Topbar';
import Home from './screens/Home/Home';
import Users from './screens/Users/Users';
import Tablas from './screens/Tablas/Tabla';
import Tablero from './screens/Tablero/Tablero';
import Summary from './screens/summary/Summary';

export default withRouter(
	class App extends React.PureComponent {
		render() {
			return (
				<div>
					{/* <Topbar /> */}
					<Topbar /> 
					
					<Switch>
						<RouteWithTitle exact title="Inicio" path="/inicio" component={Home} />
						<RouteWithTitle exact title="Tablero" path="/tablero" component={Tablero} />
						<RouteWithTitle exact title="Tabla" path="/tabla" component={Tablas} />
						<RouteWithTitle exact title="Resumen" path="/summary" component={Summary} />			
						<RouteWithTitle exact title="Reportes" path="/usuarios" component={Users} />
						<Redirect to={'/inicio'} />
					</Switch>
				</div>
			);
		}
	}
);

export const RouteWithTitle = ({ title, render, component: Comp, ...props }) => (
	<Route {...props} render={(p) => <DocumentTitle title={title}>{render ? render(p) : <Comp {...p} />}</DocumentTitle>} />
);