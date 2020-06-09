require 'test_helper'

class MedsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @med = meds(:one)
  end

  test "should get index" do
    get meds_url
    assert_response :success
  end

  test "should get new" do
    get new_med_url
    assert_response :success
  end

  test "should create med" do
    assert_difference('Med.count') do
      post meds_url, params: { med: { date_start: @med.date_start, dosage: @med.dosage, duration: @med.duration, frequency: @med.frequency, indication: @med.indication, name: @med.name, time: @med.time, user_id: @med.user_id } }
    end

    assert_redirected_to med_url(Med.last)
  end

  test "should show med" do
    get med_url(@med)
    assert_response :success
  end

  test "should get edit" do
    get edit_med_url(@med)
    assert_response :success
  end

  test "should update med" do
    patch med_url(@med), params: { med: { date_start: @med.date_start, dosage: @med.dosage, duration: @med.duration, frequency: @med.frequency, indication: @med.indication, name: @med.name, time: @med.time, user_id: @med.user_id } }
    assert_redirected_to med_url(@med)
  end

  test "should destroy med" do
    assert_difference('Med.count', -1) do
      delete med_url(@med)
    end

    assert_redirected_to meds_url
  end
end
