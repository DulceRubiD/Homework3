import React from 'react';
import styles from './Tablero.module.scss';
import Input from '../../components/Input/Input';
import Board from '../../Board/Board';
import Button from '../../components/Button/Button';
import produce from 'immer/dist/immer';

export default (class Tablero extends React.PureComponent {
	state = {

		lstObj:[],
		template:{
			title: '',
			items: [ ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		}
	

	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (i) => {
		if(this.state.lstObj[i].input.add.length>0){
			const nextState = produce(this.state, (draft) => {
				draft.lstObj[i].items = draft.lstObj[i].items.concat(draft.lstObj[i].input.add);
				draft.lstObj[i].input.add = '';
			});
			this.setState(nextState);
		}
		
	};

	onRemoveItem = (index, i) => {
		const nextState = produce(this.state, (draft) => {
			draft.lstObj[i].items.splice(index, 1);
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (i) => {
		
		const nextState = produce(this.state, (draft) => {
			draft.lstObj.splice(i, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, i) => {

		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.lstObj[i].input.add = value;
		});
		this.setState(nextState);
	};

	onRemoveInputChange = (event, i) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.lstObj[i].input.remove = value;
		});
		this.setState(nextState);
	};

	//Agregar nuevos template
	onAddTemplateChange=(e)=>{
		const title= e.target.value;
		
		const nextState = produce(this.state, (draft) => {
			draft.template.title = title.toUpperCase();;
		});
		this.setState(nextState);
		
	}

	onbtnTemplateChange=(e)=>{
		if(this.state.template.title.length>0){
			const nextState = produce(this.state, (draft) => {
				draft.template.title = '';
				draft.lstObj= [...this.state.lstObj,this.state.template];
			});
			this.setState(nextState);
		}
		
	}


	render() {
		const { lstObj ,template} = this.state;
		return (
			<div>
				<p className={styles.title}> Listas:  {lstObj.length} </p>

				<div className={styles.container_boards}>
				    
						<Input  value={template.title} onChange={this.onAddTemplateChange} />					
						
						<Button  type='add' onClick={this.onbtnTemplateChange} className={styles.button}/>
				</div>

				<div className={styles.container_boards}>
					{
						lstObj.map((obj,i)=>{
							
							return (
							
								<Board
									object={obj}
								
									onAddButtonClick={() => this.onAddButtonClick(i)}		
									onRemoveButtonClick={() => this.onRemoveButtonClick(i)}				
									onAddInputChange={(event) => this.onAddInputChange(event, i)}
									onRemoveInputChange={(event) => this.onRemoveInputChange(event, i)}
									onRemoveItem={(index) => this.onRemoveItem(index, i)}

								/>

							)
						})
						
					}
				</div>

				<div className={styles.summary}>
					<ul>{
						lstObj.map((obj,i)=>{
							return (
							<li> {obj.title} {obj.items.length}</li>
						
							)
						})
					
					}
						
					</ul>
				</div>
			</div>
		);
	}

});
