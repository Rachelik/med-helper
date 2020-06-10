class Med < ApplicationRecord
  belongs_to :user

  before_save :date_end
  def date_end
    self.date_start+self.duration.days
  end
end
