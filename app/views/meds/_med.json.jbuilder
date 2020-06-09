json.extract! med, :id, :name, :indication, :frequency, :time, :dosage, :date_start, :duration, :user_id, :created_at, :updated_at
json.url med_url(med, format: :json)
