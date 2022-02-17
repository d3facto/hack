
function App() {

  return (
    <>
      Hello
    </>
  )
}

function Card({ className, children }) {
  return <div className={`${className} card`}>{children}</div>
}

export default App
