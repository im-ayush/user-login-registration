import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';

import {API} from '../../backend.js';

import {getCookie} from '../../helpers/getCookie';


const UserProfile = (props) => {
	const [user, setUser] = useState(props.user)
	const [token, setToken] = useState(props.token)

	const [formState, setFormState] = useState({
																							isReadOnly: "readonly"
																						})

	const [error, setError] = useState("")

	const updateUser = (event) => {
		const formData = new FormData();
		formData.append("first_name", user.first_name);
		formData.append("last_name", user.last_name);
		formData.append("email", user.email);

		if (typeof(user.photo)==="object"){
			formData.append("photo", user.photo);
		}
		if (typeof(user.dob)==="string"){
			formData.append("dob", user.dob);
		}

		fetch(user.url, {
				method: 'PATCH',
				headers: {
					'X-CSRFToken': getCookie('csrftoken'),
					'Authorization': `jwt ${token}`
				},
				body: formData
			})
				.then(response => response.json())
				.then(json => {
					if (json.is_active){
						props.updateUserDetail(json);
				} else{
					setError(json);
				}
			}).catch(e => {
				setError(e.message);
			});
	}

	const logOut = (event) => {
		fetch(`${API}auth/logout/`, {
				method: 'GET',
				headers: {
					'X-CSRFToken': getCookie('csrftoken'),
					'Authorization': `jwt ${token}`
				},
			})
				.then(response => {
														if (response.ok) {
																props.resetStore();
																return response.json();
														 } else {
																 throw new Error('Something went wrong ...');
														 }
												 })
				.then(json => {
					if (json){
						console.log(json);
				} else{
					setError(json);
				}
			}).catch(e => {
				setError(e.message);
			});
	}

	useEffect(() => {
		setUser(props.user);
	}, [props.user]);

	return (
		<div>
			<nav>
				<button
					style={{
						float: 'right',
						marginRight: '30px',
						marginTop: '5px'
					}}

					onClick={logOut}>
					Log Out
				</button>
			</nav>
			<form>
				<table >
					<tbody>

						<tr>
							<td rowSpan="8">
								<img src={user.photo} alt="user" height="350px" width="250px"/>
							</td>
							<th>
								<label>First Name</label>
							</th>
							<td>
								<input
									type='text'
									placeholder='Ayush'
									defaultValue={user.first_name}
									onChange={(e)=>setUser({...user, first_name: e.target.value})}
									readOnly={formState.isReadOnly}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>Last Name</label>
							</th>
							<td>
								<input
									type='text'
									placeholder='Mishra'
									defaultValue={user.last_name}
									onChange={(e)=>setUser({...user, last_name: e.target.value})}
									readOnly={formState.isReadOnly}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>Date of Birth</label>
							</th>
							<td>
								<input
									type='date'
									defaultValue={user.dob}
									onChange={(e)=>setUser({...user, dob: e.target.value})}
									readOnly={formState.isReadOnly}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>E-mail</label>
							</th>
							<td>
								<input
									type='email'
									placeholder='ayush-mishra@xyz.com'
									defaultValue={user.email}
									onChange={(e)=>setUser({...user, email: e.target.value})}
									readOnly={formState.isReadOnly}
									/>
							</td>
						</tr>

						{ formState.isReadOnly==="" &&
							(<tr>
								<th>
									<label>Profile Picture</label>
								</th>
								<td>
									<input
										style={{"textAlignLast": "center"}}
										type="file"
										accept="image/*"
										webkitrelativepath={user.photo}
										onChange={(e)=>{setUser({
																							...user,
																							photo: e.target.files[0]
																						});
																					}}
										readOnly={formState.isReadOnly}
										/>

								</td>
							</tr>)
						}
					</tbody>
				</table>
				{
					formState.isReadOnly==="readonly" ?
					(
						<button
						onClick={(e)=>{
						e.preventDefault();
						setFormState({
													isReadOnly:""
												})
					}}
					>
						Edit
					</button>
				) :
					(
						<button
							type="submit"
							onClick={(e)=>{
								e.preventDefault();
								setFormState({
															isReadOnly:"readonly"
														})
								updateUser();
							}}
						>
							Save
						</button>
					)
				}
			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		token: state.token,
		user: {...state.user}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserDetail: (user) => {dispatch({type:'UPDATE_USER', user})},
		resetStore: (user) => {dispatch({type:'RESET_STORE'})}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
