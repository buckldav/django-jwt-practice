import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const refresh = sessionStorage.getItem('refresh')
    if (refresh) {
      // Refresh on page load
      fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "refresh": refresh
        })
      })
        .then(res => res.json())
        .then(json => {
          fetch('http://localhost:8000/core/current_user/', {
            headers: {
              Authorization: `JWT ${json.access}`
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.username) {
                setAuth({
                  access: json.access,
                  user: data
                })
              } else {
                // Error logging in
                sessionStorage.clear()
                setAuth(null)
              }
              setLoading(false)
            })
        })  
    } else {
      setLoading(false)
    }
  }, [auth])

  const handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        setAuth({
          access: json.access,
          user: json.user
        });
        sessionStorage.setItem('refresh', json.refresh);
      });
  };

  const handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        setAuth({
          access: json.access,
          user: json.user
        });
        sessionStorage.setItem('refresh', json.refresh);
      });
  };

  const handle_logout = () => {
    sessionStorage.removeItem('refresh');
    setAuth(null)
  };

  return (
    <div className="App">
      {loading ? null : 
        <>
          {auth
            ? <>
              <h3>Hello, {auth.user.username}</h3>
              <button onClick={handle_logout}>Logout</button>
            </>
            : <>
              <LoginForm handle_login={handle_login} />
              <SignupForm handle_signup={handle_signup} />
            </>
          }
        </>
      }
    </div>
  );
}

export default App;