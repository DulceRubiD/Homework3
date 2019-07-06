import * as React from 'react';
import sumary from '../../resources/jsons/summaryHeaders.json';
import sumarydatos from '../../resources/jsons/summaryData.json';
import styles from '../summary/Summary.module.scss';
export default (class Tabla extends React.PureComponent {
	state = {};

	componentDidMount() {}

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			case 'sumC':
			
				return data.reduce((acc, row) =>(acc  +=parseFloat(row.sold)+parseFloat(row.promos)+parseFloat(row.courtesies) ), 0);
			default:
				return item.footer;
		}
	};

	calculateTotal = (data, item,y) => {
		switch (item.value) {
			case 'quantity':
			return parseFloat(data[y].sold)+parseFloat(data[y].promos) +parseFloat(data[y].courtesies)
			default:
				return item.footer;
		}
	};

	render() {

		const headers = sumary;
		const datasumm = sumarydatos;
		
		return (	
			datasumm.map((data) => {
				return (
					<div className={styles.main}>
						<p>  {data.name} </p>
				<table className={styles.table}>
					
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						{data.summary.map((item, y) => {
							return (
								<tr key={y} className={styles.row}>
									{headers.map((header, i) => {
										return <td className={styles.row_item}>
										{
											header.value==='quantity' ? this.calculateTotal(data.summary, header,y):item[header.value]
											
											
										}
										</td>;
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, i) => {
								return <td  key={i} className={styles.footer_item}>
								{
									this.calculateFooter(data.summary, header)}
								</td>;
							})}
						</tr>
					</tfoot>
				</table>
			</div>
				);
			})					
			
		);
	}
});
