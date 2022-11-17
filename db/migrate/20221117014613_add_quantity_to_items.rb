# frozen_string_literal: true

# Adding limitations to items
class AddQuantityToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :quantity, :integer
    add_column :items, :show, :boolean
  end
end
