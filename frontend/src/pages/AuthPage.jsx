import { json, redirect, Form } from 'react-router-dom'

import { useSearchParams } from 'react-router-dom'
import LoginFrom from '@/components/Auth/LoginFrom'
import SignupForm from '@/components/Auth/SignupForm'

function AuthPage() {
    const [searchParams] = useSearchParams()
    const isLogin = searchParams.get('mode') === 'login'

    if (isLogin) {
        return (
            // <Form method="post" >
            <LoginFrom isLogin={isLogin} />
            // </Form>
        )
    } else {
        return (
            // <Form method="post">
            <SignupForm isLogin={isLogin} />
            // </Form>
        )
    }
}

export default AuthPage

// export async function action({ request }) {
//     const searchParams = new URL(request.url).searchParams
//     const mode = searchParams.get('mode') || 'login'

//     if (mode !== 'login' && mode !== 'signup') {
//         throw json({ message: '노ㅁㄴㅇㄹㅁㄴㄹㅇ' }, { status: 442 })
//     }

//     const data = request.formData()

//     let authData
//     if (mode === 'login') {
//         authData = {
//             email: data.get('email'),
//             password: data.get('password'),
//         }
//         console.log(authData)
//     } else {
//         authData = {
//             email: data.get('email'),
//             password: data.get('password'),
//             name: data.get('_name'),
//             size: data.get('dogSize'),
//         }
//     }

//     const response = await fetch(
//         'http://223.130.139.240/api/v1/users/' + mode,
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(authData),
//         }
//     )

//     if (response.status === 422 || response.status === 401) {
//         return response
//     }

//     if (!response.ok) {
//         throw json({ message: '사용자 찾을 수 없음.' }, { status: 500 })
//     }

//     // 토큰 받고 관리

//     return redirect('/')
// }
