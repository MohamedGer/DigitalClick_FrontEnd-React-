import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import LoadingSpinner from './LoadingSpinner';

class AddVirtualMachine extends Component {
    state = { OSProviders:null, isLoading:true } 
    constructor()
    {
      super()
      this.SelectedID = React.createRef();
      this.SelectedID="1"
      
      
    }
    onChangeHandler = (e) => {
      const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.SelectedID=option;  
      setTimeout(() => {},1000);
    }
    handlesubmit=(props)=>
    {
      props.preventDefault();
      let PropsString=""
      let i=0
      let url="http://127.0.0.1:8000/api/AddOS"
      for(i=0;i<2;i++)
      {
       if(i==0)
       {
         PropsString='?'+props.target[i].name+'='+this.SelectedID
       }
       else
       {
         PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
       }
       
         this.SERVERAPICALL(url+PropsString)
      }



    }
    SERVERAPICALL = async (url) => {
      try {
        const response = await fetch(url,{
          method: "GET",
          headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }});
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };
    TurnoffLoadingScreen=()=>{

      this.setState({isLoading: false})
    }

componentDidMount =()=>
{
  let Json=null
let url="http://127.0.0.1:8000/api/GetAllOSProviders"
 Json=this.SERVERAPICALL(url)
 Json.then((result)=>{
  let OSProviders_List=[]
 result.map((server)=>{
  OSProviders_List.push(server) 
 }
 )
 
 this.setState({OSProviders:OSProviders_List}, () => {
  this.TurnoffLoadingScreen();
})
 
}
);
}
    render() { 
      if(this.state.isLoading)
      {
        return (
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
        )
       
      }
      else
      {

        return ( 
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <img roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/Default_OS_Logo.png')} alt="Category"/>
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>
<Form onSubmit={this.handlesubmit}>
<Form.Group className="mb-3" >
        <Form.Label
        style={{color: 'black'}}
        >OS Company:</Form.Label>
        <Form.Select required name="OperatingSystemProvider_ID" onChange={this.onChangeHandler}>

       {
        this.state.OSProviders.map((OSProvider)=>{
          
          return(
            <option id={OSProvider.OperatingSystemProvider_ID}>{OSProvider.OperatingSystem_Company_Name } </option>

          )
        })
       } 
        
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >OS Name:</Form.Label>
        <Form.Control type="text" placeholder="OS name here" name="OperatingSystem_Name" />
        <Form.Text className="text-muted">       
        </Form.Text>
      </Form.Group>
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add OperatingSystem</button>
</div>     
    </Form>
    </MDBContainer>
    </div>
        );
      }
    }
}
 
export default AddVirtualMachine;