
import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// const Modal = ({ match, history }) => {

//     const back = (e) => {
//         e.stopPropagation()
//         history.goBack()
//     }
//     return (
//         <div
//             onClick={back}
//             style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 background: 'rgba(0, 0, 0, 0.15)'
//             }}
//         >
//             <div className='modal' style={{
//                 position: 'absolute',
//                 background: '#fff',
//                 top: 25,
//                 left: '10%',
//                 right: '10%',
//                 padding: 15,
//                 border: '2px solid #444'
//             }}>
//                 <h1>{123}</h1>
//                 <div color={'#pink'} />
//                 <button type='button' onClick={back}>
//                     Close
//           </button>
//             </div>
//         </div>
//     )
// }
// const previousLocation = ''

// const Menu = () => (
//     <Route render={({ location, location: { pathname }, history }) => {

//         return (<div>

//             <div className="nav">
//                 <Link to="/" >home</Link>
//                 <Link to="/about/">about</Link>
//                 <Link to={{
//                     pathname: `/about/modal/`,
//                     state: { modal: true }
//                 }}>modal</Link>

//             </div>
//             <div hidden={!/\/about\/[^\/]/.test(pathname)}>
//                 <Link to="/about/A">aboutA</Link>
//                 <Link to="/about/B">aboutB</Link>
//             </div>
//         </div>)
//     }



//     } />
// )


// const Main = ({ location }) => {
//     return (
//         <div>
//             <Route exact
//                 path="/"
//                 component={Devices}
//             />

//             <Route path="/about/:id?"
//                 render={
//                     ({ history, location, match }) => {
//                         console.log(match.params.id)
//                         return (<div>
//                             {match.params.id || 'about'}
//                         </div>)
//                     }

//                 }
//             />
//             <Route exact
//                 path="/about/modal/"
//                 component={Modal}
//             />

//         </div>
//     )
// }


const App = () => {

    return (
        <div>
            <div><Link to='/config'>config</Link></div>
            <Route path="/config" render={({ location }) => { return <div>Config</div> }} />
        </div>
    );


}


export default App;