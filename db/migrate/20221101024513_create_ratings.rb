# frozen_string_literal: true

# Migration for creating Ratings table
class CreateRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :ratings do |t|
      t.integer :score
      t.string :comment

      t.timestamps
    end
  end
end
