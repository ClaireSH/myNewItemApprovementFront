/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const query_debug = /* GraphQL */ `
  query Query_debug {
    query_debug {
      event
    }
  }
`;
export const query_book_item = /* GraphQL */ `
  query Query_book_item($input: queryTempItemInput) {
    query_book_item(input: $input) {
      exmall_cooperation {
        enable_cooperation
        exmall_type
      }
      item {
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
      item_attributes_books {
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
      item_author {
        author_name
        author_name_eng
        author_name_kana
        role
        update_type
      }
      item_comment {
        comment
        comment_type
        update_type
      }
      item_duplicate_key {
        duplicate_key
        key_type
      }
      item_tag {
        tag
        update_type
      }
    }
  }
`;
export const query_soft_item = /* GraphQL */ `
  query Query_soft_item($input: queryTempItemInput) {
    query_soft_item(input: $input) {
      item {
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
      item_attributes_soft {
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
      item_author {
        author_name
        author_name_eng
        author_name_kana
        role
        update_type
      }
      item_comment {
        comment
        comment_type
        update_type
      }
      item_tag {
        tag
        update_type
      }
      item_duplicate_key {
        duplicate_key
        key_type
      }
      exmall_cooperation {
        enable_cooperation
        exmall_type
      }
    }
  }
`;
export const query_game_item = /* GraphQL */ `
  query Query_game_item($input: queryTempItemInput) {
    query_game_item(input: $input) {
      item {
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
      item_attributes_game {
        speccode
        vendor
        playback_device
        open_date
      }
      item_author {
        author_name
        author_name_eng
        author_name_kana
        role
        update_type
      }
      item_comment {
        comment
        comment_type
        update_type
      }
      item_tag {
        tag
        update_type
      }
      item_duplicate_key {
        duplicate_key
        key_type
      }
      exmall_cooperation {
        enable_cooperation
        exmall_type
      }
    }
  }
`;
export const query_search_items = /* GraphQL */ `
  query Query_search_items($input: searchInstoreCodeInput) {
    query_search_items(input: $input) {
      count
      items {
        PK
        SK
        versatility
        instore_code
        souko_master_group
        tri_master_group
        genre1
        genre2
        genre3
        genre1_souko
        genre2_souko
        genre3_souko
        genre1_shelf
        genre2_shelf
        genre3_shelf
        genre1_name
        genre2_name
        genre3_name
        genre1_souko_name
        genre2_souko_name
        genre3_souko_name
        genre1_shelf_name
        genre2_shelf_name
        genre3_shelf_name
        new_item_approval_block
        bumon_group
        souko_bumon_group
        t_bumon_cd
        b_bumon_cd
        k_bumon_cd
        s_bumon_cd
        jan_code
        jan_code_1
        jan_code_2
        jan_code_3
        jan_code_4
        jan_code_5
        size_format
        book_size
        model_number
        name
        name_kana
        name_intl
        price_display_method
        price
        release_date
        content
        sub_content
        tag
        limited_type
        restricted_type
        group_code
        souko_cooperation_type
        tri_cooperation_type
        is_souko
        is_store_pos
        rakuten_type
        yauc_type
        au_pay_market_type
        yshp_type
        amazon_type
        reg_dt
        update_dt
        common_update_dt
        others_update_dt
        price_update_dt
        memo
        memo_update_type
        item_description
        item_description_update_type
        accessories
        attach_kbn
        seq_no
        remarks_at_appraisal
        msg_kbn
        nga_key
        nip_key
        nips_code
        jmd_key
        skd_key
        volume
        volume_no
        volume_last_no
        subtitle
        subtitle_kana
        volume_title
        volume_title_kana
        series_name
        series_volume
        series_name_kana
        subseries_name
        subseries_volume
        subseries_name_kana
        size
        sales_target_code
        publication_form_code
        classification_code
        magazine_code
        ndc_code
        bookpage_code
        nga_image_code
        publisher
        distributor
        open_day
        import_type
        special_media_type
        copyguard_type
        vendor
        num_sets
        total_track
        time
        key_jan_info_2
        sales_channel_code
        title_avcg_type
        progress_type
        discontinued_day
        open_time
        individual_sale
        rerelease
        old_item_number
        rerelease_item_number
        similar_item
        hit_chart_type
        maxi_single_type
        limited_type_code
        media_info
        item_shape
        benefits
        mastering_info
        recording_year
        short_remarks
        set_count
        total_works
        total_run_time
        works
        run_time
        media_format_code
        media_format_remarks_1
        media_format_remarks_2
        order_deadline
        distribution_kind
        title_standard_product_number
        region_code
        mobile_type_cd
        mobile_type_name1
        is_mobile
        manufacturer_id
        manufacturer_name
        playback_device
        rarity
        card_color
        radiance
        illustration
        card_spec_1
        card_spec_2
        card_text
        card_level
        card_power
        card_attribute
        tribal
        pitid
        capid
        item_detail
        set_content
        kinds
        prod_country
        description
        title
        title_kana
        carrier_cd
        carrier_name
        brand_id
        brand_name
        customer_stratum
        model
        series
        color_1
        color_2
        material
        feature
        crystal
        waterproof_performance
        clock_function
        power_reserve
        spec
        cpu
        ram
        storage
        os
        sim_size
        communication_system
        screen_size
        pixel_number
        bluetooth
        generation
        wholesaler
        expiration_date
        item_name_1
        item_name_2
        type
        number_of_keys
        side
        group
        track
        film_prod_country
        film_prod_year
        color_mode
        synopsis
        film_description
        film_cast
        film_prize
        movie_standard
        org_lang
        lang_sound
        dubbed_lang
        editor_id
        images_exp
        images_inh
        latest
        reg_by
        state
        film_part
        author
        ass_commodity_kind_cd
        ass_commodity_kind_name
        duplicate_register
        duplicate_error
        attribute_error
        is_purchase_ng
        is_r
        is_public_buy_price
        stock_limit
        exhibit_kbn
        label_item1_cd
        label_item2_cd
        label_item3_cd
        label_item4_cd
        genre_c
      }
    }
  }
`;
export const query_detail_by_duplicate_key = /* GraphQL */ `
  query Query_detail_by_duplicate_key($input: queryDetailByDuplicateKeyInput) {
    query_detail_by_duplicate_key(input: $input) {
      d_item {
        key_type
        duplicate_key
        instore_code_list {
          instore_code
        }
      }
    }
  }
`;
export const query_bol_bumon_group = /* GraphQL */ `
  query Query_bol_bumon_group {
    query_bol_bumon_group {
      group_code
      group_name
    }
  }
`;
export const scan_book_items = /* GraphQL */ `
  query Scan_book_items($input: scanTempItemsInput) {
    scan_book_items(input: $input) {
      import_no
      import_group_type
      provider
      b_items {
        author_name
        bumon_category
        genre1
        genre2
        genre3
        instore_code
        category
        jan_code
        item_name
        price
        release_date
        series_name
        subtitle
        volume
        volume_title
      }
    }
  }
`;
export const scan_soft_items = /* GraphQL */ `
  query Scan_soft_items($input: scanTempItemsInput) {
    scan_soft_items(input: $input) {
      import_no
      import_group_type
      provider
      s_items {
        instore_code
        category
        genre1
        genre2
        genre3
        jan_code
        speccode
        item_name
        author_name
        price
        release_date
        open_date
        bumon_category
      }
    }
  }
`;
export const scan_game_items = /* GraphQL */ `
  query Scan_game_items($input: scanTempItemsInput) {
    scan_game_items(input: $input) {
      import_no
      import_group_type
      provider
      s_items {
        instore_code
        category
        genre1
        genre2
        genre3
        jan_code
        item_name
        bumon_category
        price
        speccode
        release_date
        open_date
        author_name
      }
    }
  }
`;
export const scan_class = /* GraphQL */ `
  query Scan_class($input: scanClassInput) {
    scan_class(input: $input) {
      group_code
      group_name
      details {
        type_code
        type_name
      }
    }
  }
`;
export const scan_file = /* GraphQL */ `
  query Scan_file($input: scanImportFileInput) {
    scan_file(input: $input) {
      file_name
      import_date
      import_group_type
      import_no
      import_time
      provider
    }
  }
`;
export const scan_genre = /* GraphQL */ `
  query Scan_genre($input: scanGenreInput) {
    scan_genre(input: $input) {
      count
      items {
        G_assess_pith
        G_assess_rank_base
        G_coeff_buy
        G_coeff_sell
        G_e_name
        G_elapse_pith
        G_featured_col
        G_has_no_child
        G_name
        G_parent_code
        G_price_pitch
        G_tier
        PK
        SK
      }
      page
    }
  }
`;
