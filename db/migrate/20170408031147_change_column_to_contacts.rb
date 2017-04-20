class ChangeColumnToContacts < ActiveRecord::Migration
  def change
    # 追加
    add_column :contacts, :name, :string
    add_column :contacts, :email, :string

    # 削除
    remove_column :contacts, :title, :string
  end
end
