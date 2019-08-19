const USER_FIELDS = 'id, email, firstName, lastName, avatar, role';

export const CURRENT_QUERY = `
  query {
    current {${USER_FIELDS}}
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {${USER_FIELDS}}
    }
  }
`;

export const SIGNUP_MUTATION = `
  mutation Signup($input: SignUpUserInput!) {
    signup(input: $input) {
      token,
      user {${USER_FIELDS}}
    }
  }
`;

export const EDIT_PROFILE_MUTATION = `
  mutation EditUser($input: EditUserProfileInput!) {
    editUserProfile(input: $input) {
      ${USER_FIELDS}
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = `
  mutation ChangePassword($input: ChangeUserPasswordInput!) {
    changePassword(input: $input) {
      ${USER_FIELDS}
    }
  }
`;
