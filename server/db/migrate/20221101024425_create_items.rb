# frozen_string_literal: true

# Migration for creating Items table
class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :image_link
      t.decimal :price, precision: 8, scale: 2

      t.timestamps
    end
  end
end
