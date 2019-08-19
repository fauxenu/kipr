import axios from 'axios';
import GraphQLError from './GraphQLError';

const getResponseStatus = (response) => {
  const { errors = [] } = response;
  const [error] = errors;
  return error ? error.code : response.status;
};

class GraphQLClient {
  constructor() {
    this.client = axios.create({ baseURL: __API__ });
  }

  async query({ query, variables }) {
    const { data: response } = await this.client.post('', { query, variables });
    const { data, errors } = response;

    if (errors) {
      throw new GraphQLError(errors);
    }
    return data;
  }

  // REST proxies

  async post(...args) {
    return this.client.post(...args);
  }

  async put(...args) {
    return this.client.put(...args);
  }

  async patch(...args) {
    return this.client.patch(...args);
  }

  async get(...args) {
    return this.client.get(...args);
  }

  async delete(...args) {
    return this.client.delete(...args);
  }

  setBearerToken(token) {
    if (token) {
      this.client.defaults.headers.common.Authorization = `bearer ${token}`;
    } else if (this.client.defaults.headers.common.Authorization) {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  addStatusCodeInterceptor(code, callback) {
    this.client.interceptors.response.use(
      response => (
        getResponseStatus(response) === code
          ? callback(response)
          : Promise.resolve(response)
      ),
      (error) => {
        const status = error.response ? error.response.status : error.status;
        return status === code
          ? callback(error)
          : Promise.reject(error);
      },
    );
  }
}

export default new GraphQLClient();
