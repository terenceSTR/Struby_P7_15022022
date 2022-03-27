import Signup from './views/users/Signup-users'
import Login from './views/users/Login-users'
import ModifyUser from './views/users/Modify-users'
import DeleteUser from './views/users/Delete-users'
import CreatePost from './views/posts/Create-posts'
import AllPosts from './views/posts/Posts-all'
import SinglePost from './views/posts/Single-post'
import ModifyPost from './views/posts/Modify-posts'
import DeletePost from './views/posts/Delete-posts'
import ModifyComment from './views/comments/Modify-comments'
import DeleteComment from './views/comments/Delete-comments'
import AllUsers from './views/admin/Users-admin'
import AdminModifyUser from './views/admin/Modify-admin'
import AdminDeleteUser from './views/admin/Delete-admin'
import NotFound from './views/404-error'

export default [
    // User routes
    { path: '/', name: 'login', component: Login },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/modify-user', name: 'modifyUser', component: ModifyUser },
    { path: '/delete-user', name: 'deleteUser', component: DeleteUser },

    // Post routes
    { path: '/create-post', name: 'createPost', component: CreatePost },
    { path: '/posts', name: 'allPosts', component: AllPosts },
    { path: '/post/:id', name: 'singlePost', component: SinglePost },
    { path: '/modify-post/:id', name: 'modifyPost', component: ModifyPost },
    { path: '/delete-post/:id', name: 'deletePost', component: DeletePost },

    // Comment routes
    { path: '/post/:postId/modify-comment/:id', name: 'modifyComment', component: ModifyComment },
    { path: '/post/:postId/delete-comment/:id', name: 'deleteComment', component: DeleteComment },

    // Admin routes
    { path: '/admin/users', name: 'allUsers', component: AllUsers },
    { path: '/admin/modify-user/:id', name: 'adminModifyUser', component: AdminModifyUser },
    { path: '/admin/delete-user/:id', name: 'adminDeleteUser', component: AdminDeleteUser },
    
    // 404
    { path: '*', name: 'notFound', component: NotFound }
]
