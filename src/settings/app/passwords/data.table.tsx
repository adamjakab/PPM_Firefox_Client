import React, { FC } from 'react'
import { Observer, useDataHook } from 'model-react'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'

const RawDataTableCell: FC<{v:string}> = ({ v }) => {
  return (
    <td>{v}</td>
  )
}

const DataTableRow: FC<{passcard:PasswordCard}> = ({ passcard }) => {
  const [h] = useDataHook()

  /*
  const observer = new Observer(h => passcard.getText(h))
  observer.listen((value, { exceptions, isLoading }, prevValue) => {
    console.log('txt change: ' + value)
  }) */

  return (
    <tr>
      <RawDataTableCell v={passcard.getId(h)} />
      <RawDataTableCell v={passcard.getName(h)} />
      <RawDataTableCell v={passcard.getText(h)} />
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
        {pwdlist.getItems(h).map((item) => (
          <DataTableRow key={item.getId(h)} passcard={item} />
        ))}
        </tbody>
      </table>
    </div>
  )
}
