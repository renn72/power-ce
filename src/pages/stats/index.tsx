import { Button, } from '@/components/ui/button'
import { api, } from '~/utils/api'

import { usePapaParse, } from 'react-papaparse'

import Papa from 'papaparse'

const Stats = () => {

  const { mutate: getCsv, } = api.compLift.getCsv.useMutation({
    onSuccess: (r) => {
      console.log('csv', r)
    },
  })
  // const url = 'https://www.openpowerlifting.org/api/liftercsv/mitchlee1'
  // const { readRemoteFile, } = usePapaParse()
  const handleReadRemoteFile = () => {
    const url = 'https://www.openpowerlifting.org/api/liftercsv/mitchlee1.csv'
    Papa.parse(url, {
      download: false,
      // delimiter: ',',
      header: true,
      complete: function(results) {
        console.log(results)
      },
    })
    //   readRemoteFile(url, {
    //     complete: (results) => {
    //       console.log('---------------------------')
    //       console.log('Results:', results)
    //       console.log('---------------------------')
    //     },
    //   })
  }

  const tryFetch = async () => {
    const res = await fetch('https://www.openpowerlifting.org/api/liftercsv/mitchlee1.csv')

    const data = await res.text()
    console.log('data', data)
  }

  return (
    <div>
      <h1>Stats</h1>
      <Button onClick={() => getCsv()}>Get CSV</Button>
      <Button onClick={() => handleReadRemoteFile()}>remote read</Button>
      <Button onClick={() => tryFetch()}>try fetch</Button>
    </div>
  )
}

export default Stats
