export default function AuthCodeError() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Authentication Error</h1>
      <p>Something went wrong during login. Please try again.</p>
      <a href="/login">Back to login</a>
    </div>
  )
}