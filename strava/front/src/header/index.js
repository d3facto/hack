import configuration from '../constants'

export const Header = ({ connected }) => {
    const redirect = () => {
        window.location.href = `${configuration.API_URL}/login`
    }
    return <div style={{ height: '80px', textAlign: 'center', padding: '10px', backgroundColor: 'white', fontSize: '2rem' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Logo_Strava.png" style={{ maxHeight: '100%'}}></img> ✌️ <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/TinderLogo-2017.svg" style={{ maxHeight: '100%'}} /> ❤️ <img src="https://uploads-ssl.webflow.com/621a0db0249f22c5342ed6cc/621a4e7071674ef03f91f28f_defacto-logo-slim.svg" style={{ maxHeight: '100%'}} />
        { connected == undefined ? <button style={{ position: 'absolute', right: '20px' }} className='login-button' onClick={redirect}>Login</button> : '' }
    </div>
}