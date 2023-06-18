import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { addressOwner } = req.body
  const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressOwner}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
  const txApprove = []
  const alreadyAdded = []

  const _methodId = ['0x39509351', '0x095ea7b3'] // approve, increaseAllowance selector

  if (!addressOwner) {
    return res.status(400).json({ error: 'addressOwner is required' })
  }
  try {
    const ret = await axios.get(apiUrl)
    const transactions = ret.data.result
    transactions.forEach((tx) => {
      if (_methodId.includes(tx.methodId)) {
        const txTemp = {}
        txTemp.addressToken = tx.to
        txTemp.addressSpender = '0x' + tx.input.slice(34, 74)
        txTemp.tx = tx.hash
        if (!alreadyAdded.includes(txTemp.addressToken + txTemp.addressSpender)) {
          txApprove.push(txTemp)
        }
        alreadyAdded.push(txTemp.addressToken + txTemp.addressSpender)
      }
    })

    return res.status(201).json(JSON.stringify(txApprove, null, 2))
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
