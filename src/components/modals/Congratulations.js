import React from 'react'
import success from '../../assets/success.png'

function Congratulations({lead, sub, show, onClose}) {
  if(!show) {return null}
console.log(lead);
  return (
    <div 
      onClick={onClose} 
      style={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100vh",
          zIndex: "20",
          backgroundColor: "rgba(0,0,0,0.4)",
          textAlign: "center",
          // padding: "20px",
        }
      }
      >
        <div 
          onClick={e => e.stopPropagation()} 
          style={
            {
              backgroundColor: "#fefefe",
              borderRadius: "8px",
              marginTop: "5%",
              marginBottom: "5%",
              maxWidth: "500px",
              borderStyle: "none",
              padding: "40px",
              outline: "none"

            }
          }
          >
            <div >
                <img
                style={
                  {
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }
                } width={200} className="m-auto block"  src={success} />
            </div>
            <p style={
              {
                fontWeight: "normal",
                marginTop: "15px",
                color: "black"
              }
            } >{lead}</p>
            <p
            style={
              { 
                fontSize: "12px",
                marginTop: "40px",
                color: "black"
              }
            } >{sub}</p>
        </div>
    </div>
  )
}

export default Congratulations