class CreateMeds < ActiveRecord::Migration[6.0]
  def change
    create_table :meds do |t|
      t.string :name
      t.string :indication
      t.integer :frequency
      t.string :time
      t.string :dosage
      t.datetime :date_start
      t.integer :duration
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
