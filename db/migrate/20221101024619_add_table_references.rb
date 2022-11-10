# frozen_string_literal: true

# Migration for adding references to tables
class AddTableReferences < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :seller, foreign_key: { to_table: :users }

    add_reference :orders, :user, foreign_key: true

    add_reference :order_items, :order, foreign_key: true
    add_reference :order_items, :item, foreign_key: true

    add_reference :ratings, :user, foreign_key: true
    add_reference :ratings, :item, foreign_key: true
  end
end
