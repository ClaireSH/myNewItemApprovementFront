/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const delete_temp_item = /* GraphQL */ `
  mutation Delete_temp_item($input: deleteTempItemInput) {
    delete_temp_item(input: $input) {
      import_group_type
      import_no
      instore_code
      status
    }
  }
`;
export const restore_status = /* GraphQL */ `
  mutation Restore_status($input: deleteTempItemInput) {
    restore_status(input: $input) {
      import_group_type
      import_no
      instore_code
      status
    }
  }
`;
export const update_item = /* GraphQL */ `
  mutation Update_item($input: updateItemInput) {
    update_item(input: $input) {
      instore_code
      m_item {
        bumon_category
        contents_name
        genre1
        genre2
        genre3
        instore_code
        category
        jan_code
        limited_remark
        item_name
        item_name_eng
        item_name_kana
        price
        price_display_method
        release_date
        restricted_type
        subcontents_name
        souko_cooperation_type
        tri_cooperation_type
      }
      m_item_attributes_books {
        bookpage_code
        classification_code
        distributor
        format
        magazine_code
        ndc_code
        nga_image_code
        publication_form_code
        publisher
        sales_target_code
        series_name
        series_name_kana
        series_volume
        size
        subseries_name
        subseries_name_kana
        subseries_volume
        subtitle
        subtitle_kana
        volume
        volume_last_no
        volume_no
        volume_title
        volume_title_kana
      }
      m_item_attributes_soft {
        speccode
        title_speccode
        vendor
        distributor
        disc_count
        total_track
        time
        import_type
        special_media_type
        copyguard_type
        region_code
        edition
        sales_channel_code
        title_avcg
        progress_type
        discontinued_date
        open_date
        open_time
        contents_sales_type
        seminew_rerelease
        old_speccode
        rerelease_item_number
        similar_item
        hit_chart_type
        maxi_single_type
        limited_type_code
        media_info
        item_shape
        benefits
        mastering_info
        recording_info
        promotion_remark
        set_count
        total_works
        total_run_time
        works
        run_time
        media_format_code
        media_format_remark1
        media_format_remark2
        order_deadline
        distribution_kind
      }
      m_item_author {
        author_name
        author_name_eng
        author_name_kana
        role
        update_type
      }
      m_item_comment {
        comment
        comment_type
        update_type
      }
      m_item_tag {
        tag
        update_type
      }
      m_exmall_cooperation {
        enable_cooperation
        exmall_type
      }
      error
    }
  }
`;
export const put_new_item = /* GraphQL */ `
  mutation Put_new_item($input: putNewItemInput) {
    put_new_item(input: $input) {
      PK
      instore_code
      error
    }
  }
`;
export const update_new_item = /* GraphQL */ `
  mutation Update_new_item($input: updateNewItemInput) {
    update_new_item(input: $input) {
      PK
      instore_code
      error
    }
  }
`;
