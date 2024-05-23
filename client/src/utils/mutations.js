import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookInput: BookInput!) {
        saveBook(bookInput: $bookInput) {
            email
            password
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            savedBooks {
                authors
                description
                image
                link
                title
                bookId
            }
        }
    }
`;