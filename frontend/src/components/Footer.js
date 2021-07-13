import React from 'react'
import '../App.css';

const Footer = (props) => {
	return (
		<div>
			<footer className="App-footer">
				<h4>Github:</h4>
				&nbsp;
				<a
					style={{'color':'white', 'textDecoration': 'none'}}
					href="https://github.com/im-ayush"
				>
					@im-ayush
				</a>
			</footer>
		</div>
	)
}

export default Footer
