# frozen_string_literal: true

# Migration for creating OrderItems table
class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.integer :quantity

      t.timestamps
    end
  end
end
