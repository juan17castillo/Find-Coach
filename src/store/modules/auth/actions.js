export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQnkuW88UdO7OKO2s0WkymFdDfMl6lc1Q',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to log in! Check your login data'
      );
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },

  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQnkuW88UdO7OKO2s0WkymFdDfMl6lc1Q',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to sign up! Check your login data'
      );
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
