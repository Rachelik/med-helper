require "application_system_test_case"

class MedsTest < ApplicationSystemTestCase
  setup do
    @med = meds(:one)
  end

  test "visiting the index" do
    visit meds_url
    assert_selector "h1", text: "Meds"
  end

  test "creating a Med" do
    visit meds_url
    click_on "New Med"

    fill_in "Date start", with: @med.date_start
    fill_in "Dosage", with: @med.dosage
    fill_in "Duration", with: @med.duration
    fill_in "Frequency", with: @med.frequency
    fill_in "Indication", with: @med.indication
    fill_in "Name", with: @med.name
    fill_in "Time", with: @med.time
    fill_in "User", with: @med.user_id
    click_on "Create Med"

    assert_text "Med was successfully created"
    click_on "Back"
  end

  test "updating a Med" do
    visit meds_url
    click_on "Edit", match: :first

    fill_in "Date start", with: @med.date_start
    fill_in "Dosage", with: @med.dosage
    fill_in "Duration", with: @med.duration
    fill_in "Frequency", with: @med.frequency
    fill_in "Indication", with: @med.indication
    fill_in "Name", with: @med.name
    fill_in "Time", with: @med.time
    fill_in "User", with: @med.user_id
    click_on "Update Med"

    assert_text "Med was successfully updated"
    click_on "Back"
  end

  test "destroying a Med" do
    visit meds_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Med was successfully destroyed"
  end
end
