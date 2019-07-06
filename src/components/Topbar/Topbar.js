import * as React from 'react';
import styles from './Topbar.module.scss';
import { Link } from 'react-router-dom';

export default (class Topbar extends React.PureComponent {
	state = {};

	componentDidMount() {}

	render() {
		return (
			<div className={styles.main}>
						<ul className={styles.list}>
					<Link className={styles.item} to="/inicio">
						<li className={styles.item}> Inicio</li>
					</Link>
					<Link className={styles.item} to="/Tablero">
						<li className={styles.item}> Tableros </li>
					</Link>
					<Link className={styles.item} to="/tabla">
						<li className={styles.item}> Tablas</li>
					</Link>
					<Link className={styles.item} to="/summary">
						<li className={styles.item}> Resumen</li>
					</Link>
					<Link className={styles.item} to="/usuarios">
						<li className={styles.item}> Usuarios</li>
					</Link>
					</ul>
			</div>
		);
	}
});
