import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

Vue.use(Vuex)

// Utilisateur par défaut
const defaultUser = {
    userId: -1,
    token: ''
}

let user = localStorage.getItem('user');

// Si l'utilisateur n'est pas dans le local storage, l'utilisateur est par défaut
    // Sinon récupérer l'utilisateur du local storage
if (!user) {
    user = defaultUser;
    console.log(user, "if !user = defaultUser");
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } catch (exception) {
        user = defaultUser;
        console.log(user, "catch user=defaultUser");
    }
}

export default new Vuex.Store({
    state: {
        status: '',
        user: user,
        userInfos: {},
        userInfosByAdmin: {},
        users: [],
        posts: [],
        post: {},
        comments: [],
        comment: {}
    },

    getters: {
        userName: state => {
            return state.userInfos.name;
        },

        hasPostRole: state => {
            if (state.userInfos.id === state.post.userId) {
                return true;
            } else {
                return false;
            }
        },

        hasCommentRole: (state) => (index) => {
            if (state.userInfos.id === state.comments[index].userId) {
                return true;
            } else {
                return false;
            }
        },

        isAdmin: state => {
            if (state.userInfos.isAdmin) {
                return true;
            } else {
                return false
            }
        },

        // Retourne l'extrait du contenu de la publication (150 premières lettres)
        contentExcerpt: (state) => (index) => {
            const content = state.posts[index].content;
            if (content.length > 150) {
                return content.substring(0, 150) + '...';
            } else {
                return content;
            }
        },

        getUserRole: (state) => (index) => {
            if (state.users[index].isAdmin) {
                return 'Admin';
            } else {
                return 'Utilisateur';
            }
        },
    },

    mutations: {
        SET_STATUS: function(state, status) {
            state.status = status;
        },

        LOG_USER: function(state, user) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            // Ajouter l'utilisateur dans le local storage
            console.log(user, 'user 105')
            localStorage.setItem('user', JSON.stringify(user));
            console.log(localStorage.setItem('user', JSON.stringify(user)), 'setItem user LOG_USER');
            state.user = user;
        },

        LOG_OUT: function(state) {
            state.user = defaultUser;
            state.userInfos = {}
        },

        USER_INFOS: function(state, userInfos) {
            state.userInfos = userInfos;
        },

        SET_USER_NAME: function(state, modifiedName) {
            state.userInfos.name = modifiedName;
        },

        POSTS_LIST: function(state, posts) {
            state.posts = posts;
        },

        SINGLE_POST: function(state, post) {
            state.post = post;
        },

        CREATE_POST: function(state, newPost) {
            state.posts.unshift(newPost);
        },

        SET_POST_TITLE: function(state, modifiedTitle) {
            state.post.title = modifiedTitle;
        },

        SET_POST_CONTENT: function(state, modifiedPostContent) {
            state.post.content = modifiedPostContent;
        },

        COMMENTS_LIST: function(state, comments) {
            state.comments = comments;
        },

        SINGLE_COMMENT: function(state, comment) {
            state.comment = comment;
        },

        CREATE_COMMENT: function(state, newComment) {
            state.comment = newComment
        },

        SET_COMMENT: function(state, modifiedCommentContent) {
            state.comment.content = modifiedCommentContent;
        },

        USERS_LIST: function(state, users) {
            state.users = users;
        },

        USER_INFOS_BY_ADMIN: function(state, userInfosByAdmin) {
            state.userInfosByAdmin = userInfosByAdmin;
        },

        SET_USER_ROLE: function(state, modifiedUserRole) {
            state.userInfosByAdmin.isAdmin = modifiedUserRole;
        }
    },

    actions: {
        // S'inscrire
        createAccount({ commit }, userInfos) {
            commit('SET_STATUS', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('auth/signup', userInfos)
                    .then(function(response) {
                        commit('SET_STATUS', 'created');
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit('SET_STATUS', 'error_create');
                        reject(error);
                    })
            });
        },

        // Se connecter
        login({ commit }, userInfos) {
            commit('SET_STATUS', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('auth/login', userInfos)
                    .then(function(response) {
                        console.log(response.data, 'response.data')
                        commit('SET_STATUS', 'login');
                        commit('LOG_USER', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit('SET_STATUS', 'error_login');
                        reject(error);
                    })
            });
        },

        // Se déconnecter
        logout({ commit }) {
            commit('LOG_OUT');
            commit('SET_STATUS', '');
            // Supprimer l'utilisateur du local storage
            localStorage.removeItem('user');
        },

        // Afficher les informations d'un user
        getUserInfos({ commit, state }) {
            return new Promise((resolve, reject) => {
                instance.get(`auth/user/${state.user.userId}`)
                    .then(function(response) {
                        commit('USER_INFOS', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Modifier le nom d'un utilisateur
        editUserName({ state }, newUserName) {
            return new Promise((resolve, reject) => {
                instance.put(`auth/user/${state.userInfos.id}`, newUserName)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Supprimer un utilisateur
        deleteUser({ state }) {
            return new Promise((resolve, reject) => {
                instance.delete(`auth/user/${state.userInfos.id}`)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Créer un post
        createPost({ commit }, newPost) {
            return new Promise((resolve, reject) => {
                instance.post('posts', newPost, {'Content-Type': 'application/form-data'})
                    .then(function(response) {
                        commit('CREATE_POST', newPost);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Afficher tous les posts
        getAllPosts({ commit }) {
            return new Promise((resolve, reject) => {
                instance.get('posts')
                    .then(function(response) {
                        commit('POSTS_LIST', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Afficher un post
        getOnePost({ commit }, id) {
            return new Promise((resolve, reject) => {
                instance.get(`posts/${id}`)
                    .then(function(response) {
                        commit('SINGLE_POST', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Modifier un post
        modifyPost({ state }, modifiedPost) {
            return new Promise((resolve, reject) => {
                instance.put(`posts/${state.post.id}`, modifiedPost, {'Content-Type': 'application/form-data'})
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Supprimer un post
        deletePost({ state }) {
            // Si c'est l'admin, il peut supprimer n'importe quel post
                // Sinon l'utilisateur ne peut supprimer que son propre post
            if (state.userInfos.isAdmin) {
                return new Promise((resolve, reject) => {
                    instance.delete(`posts/admin/${state.post.id}`)
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        })
                });
            } else {
                return new Promise((resolve, reject) => {
                    instance.delete(`posts/${state.post.id}`, { data: { userId: state.post.User.id } })
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        })
                });
            }
        },

        // Afficher tous les commentaires
        getAllComments({ commit }, id) {
            return new Promise((resolve, reject) => {
                instance.get(`posts/${id}/comments`)
                    .then(function(response) {
                        commit('COMMENTS_LIST', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Afficher un commentaire
        getOneComment({ commit }, { postId, id }) {
            return new Promise((resolve, reject) => {
                instance.get(`posts/${postId}/comments/${id}`)
                    .then(function(response) {
                        commit('SINGLE_COMMENT', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Créer un commentaire
        createComment({ commit }, { id, newComment }) {
            return new Promise((resolve, reject) => {
                instance.post(`posts/${id}/comments`, newComment)
                    .then(function(response) {
                        commit('CREATE_COMMENT', newComment);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Modifier un commentaire
        editComment({ state }, modifiedComment) {
            return new Promise((resolve, reject) => {
                instance.put(`posts/${state.comment.postId}/comments/${state.comment.id}`, modifiedComment)
                console.log(state.comment.id, 'comment.id')
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Supprimer un commentaire
        deleteComment({ state }, { postId, id }) {
            // Si c'est l'admin, il peut supprimer n'importe quel commentaire
                // Sinon l'utilisateur ne peut supprimer que son propre commentaire
            if (state.userInfos.isAdmin) {
                return new Promise((resolve, reject) => {
                    instance.delete(`posts/admin/${postId}/comments/${id}`)
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        })
                });
            } else {
                return new Promise((resolve, reject) => {
                    instance.delete(`posts/${postId}/comments/${id}`, { data: { userId: state.userInfos.id } })
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        })
                });
            }
        },

        // Afficher tous les utilisateurs par l'admin
        getAllUsersByAdmin({ commit, state }) {
            return new Promise((resolve, reject) => {
                instance.get(`auth/admin/users/${state.userInfos.id}`)
                    .then(function(response) {
                        commit('USERS_LIST', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Afficher les informations d'un user par l'admin
        getUserInfosByAdmin({ commit }, id) {
            return new Promise((resolve, reject) => {
                instance.get(`auth/user/${id}`)
                    .then(function(response) {
                        commit('USER_INFOS_BY_ADMIN', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        },

        // Modifier le rôle d'un utilisateur
        editUserRole({ state }, newUserRole) {
            return new Promise((resolve, reject) => {
                instance.put(`auth/admin/users/${state.userInfosByAdmin.id}`, newUserRole)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },

        // Supprimer un utilisateur par l'admin
        deleteUserByAdmin({ state }) {
            return new Promise((resolve, reject) => {
                instance.delete(`auth/user/${state.userInfosByAdmin.id}`)
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            });
        },
    }
})
