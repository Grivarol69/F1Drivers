import styled from "styled-components"

const Create = styled.div`
	display: flex;
	width: 80%;
	margin: 40px auto;
	border-radius: 5px;
	box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.15);
	background-color: #fff;
	.card-img {
		width: 50%;
		display: flex;
		height: 480px;
		position: relative;
		img {
			width: 100%;
			object-fit: cover;
			border-radius: 5px 0 0 5px;
		}
		.loadbtn {
			width: 120px;
			height: 55px;
			margin: 4px;
			padding: 10px;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			border: none;
			position: absolute;
			bottom: 10px;
			right: 10px;
			box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.15);
			span {
				display: block;
				font-size: 12px;
			}
		}
	}
	.card-info {
		height: 440px;
		width: 50%;
		padding: 20px 40px;
		border-radius: 0 5px 0px 5px;
		background-color: #fff;
		.card-text {
			min-height: 280px;
			width: 100%;
			h1 {
				font-family: "Lobster", serif;
				font-size: 34px;
				color: #474747;
				margin: 8px 0;
			}
			form {
				color: #555;
				font-family: "Raleway", sans-serif;
				position: relative;
				.card-btn {
					width: 100%;
					margin-top: 10px;
					display: flex;
					justify-content: center;
					gap: 2rem;

					button {
						height: 40px;
						width: 176px;
						box-sizing: border-box;
						border: transparent;
						font-family: "Raleway", sans-serif;
						font-size: 14px;
						font-weight: 500;
						text-transform: uppercase;
						letter-spacing: 0.2em;
						color: #ffffff;
						background-color: #6dc264;
						cursor: pointer;
						outline: none;
						transition: all 400ms ease-in-out;
						&:hover {
							background-color: #a6d4a0;
							cursor: pointer;
						}
						&:disabled {
							pointer-events: none;
						}
						&.cancel {
							background-color: #aaa;
							&:hover {
								background-color: #ccc;
							}
						}
						&.error {
							background-color: red;
						}
						&.success {
							// width: 80px;
							transform: rotate(360deg);
						}
					}
				}
			}
		}
	}
`

export const Input = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	padding-top: 10px;
	margin-top: 5px;
	width: ${(props) => (props.width ? props.width : "100%")};
	float: ${(props) => (props.float ? props.float : "none")};
	height: ${(props) => (props.height ? props.height : "inherit")};
	.input_label {
		color: #8597a3;
		font-size: 14px;
		position: absolute;
		top: 16px;
		-moz-transition: all 0.3s;
		-o-transition: all 0.3s;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
	}
	.input_error {
		color: rgb(255, 69, 0, 0.8);
		font-size: 15px;
		position: absolute;
		top: 0;
		right: 10px;
		&.select {
			right: 40px;
		}
	}
	.label_measure {
		font-size: 14px;
		color: #8597a3;
		position: absolute;
		top: 20px;
		right: -50px;
	}
	.input_field {
		border: 0;
		padding: 0;
		z-index: 1;
		background-color: transparent;
		border-bottom: 2px solid #eee;
		font: inherit;
		font-size: 14px;
		line-height: 26px;
		padding-left: 5px;
	}
	.input_field:focus,
	.input_field:valid {
		outline: 0;
		border-bottom-color: #665856;
	}
	.input_field:focus + .input_label,
	.input_field:valid + .input_label {
		color: #666;
		font-size: 12px;
		-moz-transform: translateY(-18px);
		-ms-transform: translateY(-18px);
		-webkit-transform: translateY(-18px);
		transform: translateY(-18px);
	}
	.input_select {
		position: relative;
		min-width: 200px;
		margin-bottom: 5px;
		&:after {
			content: ">";
			font: 24px "Consolas", monospace;
			color: #888;
			-webkit-transform: rotate(90deg);
			-moz-transform: rotate(90deg);
			-ms-transform: rotate(90deg);
			transform: rotate(90deg);
			right: 14px;
			top: 4px;
			padding: 0 0 2px;
			position: absolute;
			pointer-events: none;
		}
		select {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			outline: none;
			scroll-behavior: smooth;
			display: block;
			width: 100%;
			height: 38px;
			padding: 0px 10px;
			font-size: 14px;
			line-height: 1.75;
			color: #888;
			background-color: #e3e3e3;
			background-image: none;
			border: none;
			-ms-word-break: normal;
			word-break: normal;
		}
	}
	.team-tag {
		font-size: 11px;
		text-transform: uppercase;
		padding: 5px 15px;
		margin: 3px 5px;
		background-color: powderblue;
		display: inline-block;
		position: relative;
		.remove {
			position: absolute;
			cursor: pointer;
			top: -4px;
			right: -4px;
			font-size: 9px;
			background-color: #777;
			padding: 3px 5px;
			margin: 2px 0px;
			color: white;
			border-radius: 100%;
		}
	}
`

export default Create
