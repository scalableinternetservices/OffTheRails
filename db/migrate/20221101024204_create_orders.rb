# frozen_string_literal: true

# Migration for creating Orders table
class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.boolean :purchased

      t.timestamps
    end
  end
end
