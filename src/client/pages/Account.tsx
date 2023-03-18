import { useAuthStore } from '../state'

export default function Account() {
  const userData = useAuthStore((state) => state.userData)
  return (
    <section>
      <h1>User Account</h1>
      <h2>Welcome, {userData?.username}</h2>
      <div>
        Name: {userData ? `${userData.first_name} ${userData.last_name}` : null}
      </div>
      <div>
        D.O.B.:{' '}
        {userData
          ? `${userData.dob?.month}/${userData.dob?.day}/${userData.dob?.year}`
          : ''}
      </div>
      <div>Email: {userData?.email}</div>
      {userData?.vendor_account && <div>Vendor Account</div>}
    </section>
  )
}
