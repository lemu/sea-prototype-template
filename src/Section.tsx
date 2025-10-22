import { Link } from 'react-router-dom'
import { TextLink, Card } from '@rafal.lemieszewski/tide-ui'
import seaLogo from './assets/sea.svg'

function Section() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <img src={seaLogo} className="logo sea mb-8" alt="SEA logo" />
      <Card className="p-8">
        <h1 className="text-heading-lg text-center">Section Page</h1>
        <div className="flex flex-col items-center gap-4 mt-4">
          <p>This is a demonstration of React Router functionality.</p>
          <Link to="/">
            <TextLink>Back to Home</TextLink>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Section
