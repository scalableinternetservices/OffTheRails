# frozen_string_literal: true

# Migration for creating Users table
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_hash

      t.timestamps
    end
  end
end
