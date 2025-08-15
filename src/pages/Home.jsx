import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { render } from "react-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const obtenerContacto = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/Deyra/contacts",)
			console.log(response)
			if (response.status==404){
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.contacts)
			dispatch({
				type: "obtener_contactos",
				payload: data.contacts
			})

		} catch (error) {
			console.log(error)
		}
	}

	const crearUsuario=async()=>{
		try {
			const response=await fetch("https://playground.4geeks.com/contact/agendas/Deyra",{
				method:"POST",
				headers:{"Content-Type": "application/json"}
			})
		} catch (error) {
			console.log(error)
			
		}
	}

	const borrarContacto= async(id)=>{
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/Deyra/contacts/${id}`,{
			method:"DELETE",
			headers:{"Content-Type": "application/json"}
		})
		console.log(response)
		if(response.status == 204){
			obtenerContacto()
		}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		obtenerContacto()
	},[])

	return (
		<div className="text-center mt-5">
			<h1>contactos</h1>
			<div className="d-flex justify-content-center mt-3">
				{store.contactos.map((contacto)=>( 
				<div className="card mb-3" key= {contacto.id} style={{ maxwidth: "540px" }}>
					<div className="row g-0">
						<div className="col-md-4">
							<img src={rigoImageUrl} className="img-fluid rounded-start" alt="..." />
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<div className="d-flex justifu-content-between">
									<h5 className="card-title">{contacto.name}</h5>
									<button className="btn btn-danger" onClick={()=> borrarContacto(contacto.id)}>X</button>
								</div>
								<p className="card-text">Telefono: {contacto.phone}</p>
								<p className="card-text">Addres: {contacto.addres}</p>
								<p className="card-text">Email: {contacto.email}</p>
							</div>
						</div>
					</div>
				</div> 
				))}
			</div>
			
		</div>
	);
}; 