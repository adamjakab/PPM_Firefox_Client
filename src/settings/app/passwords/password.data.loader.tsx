import React, { FC } from 'react'
import { DataLoader, useDataHook } from 'model-react'
import { PasswordList } from '../../../lib/model/password.list'
import { DataTable } from './data.table'

/**
 * Load async background Passcard list
 * @param source
 * @constructor
 */
export const PasswordDataLoader: FC<{source: DataLoader<PasswordList>}> = ({ source }) => {
  const [h, { isLoading, getExceptions }] = useDataHook()
  const data = source.get(h)

  // Check if the data is loading (after calling all the getters)
  if (isLoading()) return <div>Loading</div>

  // Check if any error occurred
  const errors = getExceptions()
  if (errors.length !== 0) return <div>Data failed to fetch</div>

  // Return the actual data and a reload button
  return (
    <div>
      <span>LOADED DATA LENGTH: { data.getLength() }</span>
      <button onClick={() => source.markDirty()}>Reload</button>
      <hr />
      <DataTable pwdlist={data} />
    </div>
  )
}
