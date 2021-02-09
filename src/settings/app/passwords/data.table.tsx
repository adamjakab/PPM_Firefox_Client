import React, { FC } from 'react'
import { useDataHook } from 'model-react'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'

export const DataTableRow: FC<{passcard:PasswordCard}> = ({ passcard }) => {
  const [h] = useDataHook()
  return (
    <tr key={passcard.getId(h)}>
      <td>
        {passcard.getId(h)}
      </td>
      <td>
        {passcard.getName(h)}
      </td>
      <td>
        {passcard.getText(h)}
      </td>
    </tr>
  )
}

export const DataTable: FC<{pwdlist:PasswordList}> = ({ pwdlist }) => {
  const [h] = useDataHook()
  return (
    <div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Text</th>
        </tr>
        </thead>
        <tbody>
        {pwdlist.getItems(h).map(item => (
          <DataTableRow passcard={item} />
        ))}
        </tbody>
      </table>
    </div>
  )
}
