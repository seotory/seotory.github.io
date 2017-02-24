function log ( msg ) {
	if ( console )
		console.log( msg );
}

(function() {
  "use strict";

  var toggles = document.querySelectorAll(".c-hamburger");
  var $Cate = $('.site-cate');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if ( this.classList.contains("is-active") === true ) {
        this.classList.remove("is-active");
        $Cate.removeClass("active");
      } else {
        this.classList.add("is-active");
        $Cate.addClass("active");
      }
    });
  }

  $('#btn-up').on('click', function ( e ) {
    $(window).scrollTop(0);
    return false;
  });
  $('#btn-down').on('click', function ( e ) {
    $(window).scrollTop($(document).height());
    return false;
  });
})();

var timer;
(function() {
  if ( $('article').size() > 0 ) {

    var imgAry = [];
    imgAry.push('https://lh3.googleusercontent.com/ZHSms8IkXdgZ8GLlwmutc_DiJ7-ksjP5NW47NMnk7lCtD-4Bihot7rk396hjS25W3A7i2MjWv_9ITeDWaF5PzJeM7K_ewqJIODrPd7mvh_bxrWRKY273KJgD-Ao6LZ1UPlcqOnUj7RgPFWofyE9IhOTLjzwRzg0qZ78WBnJI0PnAJbBpsa9UalvcuxaCc0zcJO8Trf6qT86blIXHZW2oc_vEEVWy5xbps0trH6jFYg8ghrktZoKjxY600nX8-U2smbgefOysh2ZOwlQqpbPki0WlVtHEPaHJDPbChdF9fFfPh6ilkq6go4c02Aj704XzABXhy-mJMtmQIe642EgZdKPVJEeVT3PPFY9l4hHD6wirHelDQB83HEkVyZFqdJmGHvrrFRoZjqzwx28_P4KnEWmbpcIErQqLwu5dgWupI5NV5gcJwumA2dsHfkseClM3TCZGkb5tp7YmbyDPcgyqH0KBH95Zo_UoVeoxb0HgFsIrTx59yh_c9J_qhp-rzBwzje3u7ezpdcT0ttDsjALBKWapi-afILFL4RzeZQKcLxsrtJLcK-dbv-xtafu_nH7nNEOWRSDbnUh9htmj4TUfx9cygNwjOps0plwJAH5b7tetTed5=s0');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/4.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/6.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/15.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/20.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/21.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/24.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/30.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/31.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/35.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/47.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/52.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/67.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/68.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/69.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/72.jpg');
    imgAry.push('http://ts.daumcdn.net/custom/blog/100/1006037/skin/images/82.jpg');
		imgAry.push('https://lh3.googleusercontent.com/MSDs58CBMfomEfM11c2JEJXgIy35YeBP506ZJ1_uua-L9L-W8AbU-ui9uQ1h9TaK6-ct9EmkYydC8U-nsAC4pe5Sct6AZJqUk8Mw2-g_oQfYmOPs022wF1dm63IRpQjTOV1wAul8rxuQQuBqRot18g5lbYyiGrSoRU8CwRj0q7CVKIuqgJvD5p1PgHLng3Hgb3xyRnPo7Zem3TVlCZHJF1KHQBHMeJrx5KjtYLxznNRCO5hUR0vBdQv2jvfOjhe2ia-87cNgVDzi1EES5IXJP_Ue6nHkLoQxGpb8H7SGt7E4e0u1BL7ZXvo4f20VRqYzf34BlLl0f9BQnYFfhiaYfK2e9sr5sJnA3kpM4VcWInClpv0AAes7yhMph2B-NWYc29AxOYfBEHpi0s2X-UU17dxrvYO5gyX1YK2yekjQaKOeoWmrIKyzOeePkYkTFMbPl_5adctx_LXJVJSZQJ2dTLtA5WTF3jXnwKhSLc-dm6-b6EL3vtOX-JjSev_8idNTCPV2eVa6wE5PXS_jCyYHEFrsDVYD9zKlnGtfVmFbl_17qwzmej-Xa3qNvybEJ-XTPFLXBbZ6tzZaDGyBZEzOvZyHHC69lZDgnIdjZjxSch75jNho=s0');
		imgAry.push('https://lh3.googleusercontent.com/Lxsfe7X5eIzmbSQQN7Cu6xDJa6y9ajEi3fnodddZeMqUOxRAbkef-RMQRGvCDkdHhafhnR6ucfSHD8IR9t73tsToaIFel8l-cjdA_Zzr1gsZ_i0yqSWZffnBLrWKH_Z9RG_kS65Bwb3tNtIETgbdXS7JuNFnHIXrRzsafslD33hFyUvasqVGmGDIwVm29-aZMemVdF16ZI0CksaQPACi1b9HQbYPNxwGm04oWw9LVkAxlNBM2G8nAgIIbp3ca_7sH62nXV2vGU0svbKFtoMVp9iDpInPjsxisRZG9GKFy9AqBmH_EP5GQQ87Dj2GjQa0qs34LKDck_sdpAoJ1VEXpqKTQd5iSyTZ5wfIoB8uuB_K1qLNOZfyyaKDyk4G6ith_e7NzRTnxU0Ys1KJ7gPQDwlzfkDI0yqCgbZns6I7mYE0vj9ScnSt3a7NJKhGJ709L2NescRjLpN3lyBVPE4FZGvqReYBswMDpUpujqG8k9ijepH637cVW4jBHLk_FLQ-6W_u5_BJ2kYJy1PRJ48eRqhId-sMmlhz08W1gCY67Z_EXH5D0Rn2GYJdz5g6Bv6ATtmlxPu3sCkrs8MMhX5cNGv7uk5P-KzAsqv_IUgy0F037eJI=s0');
		imgAry.push('https://lh3.googleusercontent.com/Q3aghQdTcPiX5BwZrghsy1ZDap9m2xPMSERComx_DFpYLaq2WCXeUECZ35Wj_qaVS2-SB_Jajr3jP-1w5qPr8XbvPXLHHMRHQRjLKvN0x5HOKztHHSGDLOfU-o5280piKRDbLATgRdM1cbehfwAJCKu_KawSJ20D9h29aAMzzarAbE2I8fr2yfk9KF6vyGsTJo8LFdY5zb5qTJTCTCf7F_JD9AI_7qmvYxTlk2bpjwqDoehtz5FJxxInUo8lH7RTgQSdcgEaxAJZn22AMdPh_aUI8u2-mVaiD1jgIKIAcYVrtjkZbUl18Oc-2OYcxBpKMDhH0zer1n2ESNIa9mZW2WZ9_pg9UV-3pdtHuZQIm6Kv1vNe8yqbyKevjE6Cilqhh8sHV-ugTWWG9pcLZ6ClWSyyp8gCk5ezSjZip4MMLTbUxi8VHsFp9ZwVFqwzcgaQwj0saQu8z79-P8QOqWWI3rz04cXjFhlcjkL41cmDmVqEJRQlUxxaBuMvg2VTLg1bWJfZY-18y4OqR8Irw98l5FebnEAivBeuklPF9C-eLASD-ggKqCvqjV-h4l0BA44stFZkz0i8x_EtD3m3CiGzAcCCPVwrClUaURwydwOlDVqQNx0W=s0');
		imgAry.push('https://lh3.googleusercontent.com/8q5Uk5ptQwm2AGRWSb66f1SlSg5lhjmmf_Cq1QJzMNXqZ4khwGCJwCuNpEBFkHOjEiyzmYkX2wDDqWMqR715X_YYxLkokWdgNplKYWGSxCiranhHDPQcJZVw_F1bqUcReRNWlDnYz08y7M_7ayqZeVahX1smz4oLNyKPQJXzHd2CElAjpig_zJ941dkhyO5jAkX0iCYclHTlVwIS2MqwaRmkpLcsNh2DEHzGGBq6MLDwqrl0OsiMgUWeMYSgh_sNKtHow2L-dyMIP7BCXKlvR13XXU6v5yTizf1syZkKGIOo9MakloSBGqsj4VM_vbtr8mYuacZTIQQUnXjATRpJvYsQsRIDrIuRXDKuZHlygNuGX_3E3IlJzfNppcRPg8bmF9CsG2WMuBPdjd_Tc8Yb_ftsUY8ikDzgVN-L1xOcastR-dQAaM1FwIl2ZfEFNDHem7yByLggqifwsP_V9y9qqWLwYFzc3sgtKCnKj3xvaJ9hAB4XfIEBaQVtImSq-9rYmmURxyN-yBzc9tyqOVVufTloMtwsc2O_0zxisxxuzMbCtDrPhDVTnJHnnSnP950U49Qt1oDKSs2ndmQ012Azd0PAzGpVYnZ4zS2_KgLjLdSgMXYi=s0');
		imgAry.push('https://lh3.googleusercontent.com/QThb1_KUJQ17hKrnZW_yX7Ut53o9XMKB8K5c79RY7Yjwy0Wh5L-LSSP0ijeXmBlcQg_4LaQvQMDScw2p012MTMMZUF6uB6O0bJI1mF6ZdL9lUGVfUZx0LjmjKL3a60ys2JYPqxpB7PYtOFudePHxMBdJwmrJmu1Y8HdaPKmW71rt2VCOBX-G88zQzeQG3H8BcG9qRm9YKOWvDYIgtHRVNEktxCoXDC69aoSqq9qHEZIw1IT9TIa_vKjIGAVfLgn5Z0aZmRrcW3issih4w7zSpETb9I84Knh1A60MDMeXh392hBymipZmWiOLixaxdI6dlAEpOy3kFrA-atEaZqsgu16dYG2CTJwQeKq-4jFPWwuYtlWGEKu3F0wZ4zOJp1MJKhr5z4CAAGFFt0wzJunIVO67t7OYzFc1gJFIy66ow18kiRVscE_24Dkob2sJhIACclRfXRf9PsANfCHIBaBsK4TEWNMB4Wb5wWL14oviNE8pct3awdwYTxAoEi508-wC04h57K6uCDb8AOT6qW5ryJA7hVrcz9PpPsZPoSZL9ayrtWck-DFavru55pYKuKg47J9PGJ_ym_yN3oMt7gHoOGpumf6BAAqEyhrBFXgrQqJwasKI=s0');
		imgAry.push('https://lh3.googleusercontent.com/o3xZAACdwpW9qjYm56XPd7JbwjwKzZqChYuVKlb4r6xNaiwwivS07AqsMr8M8hfo1GmS9mIiQ6JVfvxtg0eQxgOWMnggX2nftGZmxWGiIqN9Mqbd1NG_bBEs6NXm3Jk1VfC6Kkf4S0yZVABe2WlcwEl_uIhXZIETnmzcUxwfTjqQi1aCPfsrpQdiyndIxqTrobpFTnMueT_BW2eNjpz9yWTXQeTqydxmyy8ShW0szpi8AGj8JjceJlPaiKRSStMPxP7huGMY4vnSUhnSovHpoZ-jBYzcPRlu7YMpY6FHlTiHHmC1B7ct_4ZT6UzAnCqTuAEPtTyk1XepOn4LPRDdMTdWrgfGk0cwyofL5tSZMZY23z8ISQWW1cnr_MMOqMDqhkV_kFk-Jr0iX_e5E-q0qXD2odtPiQ_LeeBrbiWaW6uFepSH72rpu19iiyQHMeMN-cmbEc3tHXdBZkfTYytUgd77ZitHZuuTr4IFK728HDZfIwPgbc_qRFYKg93AFUoYIvf1gUNu2sXx7nTrUOKtnEo9jriMlZiy-N3_HD_lYqKRGQBwkl6WUZig07i6xLyUqDJs1Nh8iaWoyerKnqqKsWUv3ddeBH8xfSrAyzLiapleqMP9=s0');
		imgAry.push('https://lh3.googleusercontent.com/3rTHhapkd0ALJXVuWp-1ssRTjmArzvoufsipEltVylFJOaWP4g0NVPlxTpqIDZo9gVPfMW531B3_6ItAbgnL_7XGiXu8Pp5RZiOUUPsWydWprz4KSfs3e5z4-GPzlgJ1BfqVlxh2if3j_0Tudy0bxmiGcl5AYN1KfPiwjKbxNdv1CbdtxnCSaG9qtL1N-Jqp0vEPsRD8x9nYd6jR8p97DU1ZfJ-kg5hy3oF3GfcbZ-_K190Z8EqUzk69OKYuz6YKfA6KbhDOuQwSBIKky_46X7KaeFFrPY574Tt1GevEMZQ_ONt9cFMNXYof7J2vYQMNxKJ0jno0F4LVoMRIO9fArFaUWjE2J1ahQLgIzRhLJiGifMdCAcakwg711vFM2Kylnrg-RwHeIiXcc6r2EHtvzD13odxm0vHkPNlgU-uuGJ5vwh32Eh3B4WOmh-8u02rG_7HU3kjQU__Ahp3LBx4_uRoU9bBferH57gyDW2TJ7RhoixXAeujk5Va8tWCPrBANu60RUqfgsm9bGz91g6Rbim5LIGCmLjNT83V4f4spxMzCe_EXoxizYziir8cIpchfAyT4LeFpQrpGKARtzeLdEC84YwSUO7266WvXUx11q2VbMTzn=s0');
		imgAry.push('https://lh3.googleusercontent.com/q40DeJgbMwkDknvQm8EMGGWVeGTUQ3cgMY3qE-KhNobFsv40OicHXUtr-e0AMqM3upGd0NVoCY_0tyQm6yRTUL0lMDzW9QElnvhSj5xMJ14t8a3hFjYD3yjDaHgUaON16zcZjmvD0I54ZvFaRcpseWRSOGFBlT57i-hP4YLanKDLYuJxHTThSyQuP7di1pnr7gajmzUM0denlyOqG8eD-aug-HymLIvsCP6okBwyKS6sc7OsjmCVSufeh0lpH6ALZKvLVRGWYwGA2QdYf6S8XGo1qbw9cZ_v9xofWP678c_7so6szjwUNaeLCjJYWZWF8mSBiKksfyAQnEqomx0ujyOFBlXT6gX4Eh-9zQrIxR7XEbajkRJmLnmgmQrZKix16Bzfjss4jjBip3WmTxNpWalNzE70XyGK00jgCmdqT0GtD3X3StlP_DV1VsTJe1CNj8z1FikDuDxhZbPQOYtv5H0y7BVPTb3aAMMDVRVvPuxF_tiNaaYXOIQQH4hi61DgYLKJhb5uewGYjwq6-4UJd9ZfbY8ojVxO7AnbeYwbBdClu1iq_sDEfcpBXg61Bf-b6gjopfd1fkTnTLBgts-1MwMT-JL3vZtRlnUwPepFvpq_3jfy=s0');
		imgAry.push('https://lh3.googleusercontent.com/Goli4vSZRhsJof0kHUysxIMHAfIdwU9lEzvM6KP0OKaajCgNOHAnu1C8jq744iOOi7q_2qpUAqtS7irWMMLZMtNPHa8xaNifRIik-EDwLXYOnjd5KZhEjNCmPf61MFPl0-LL4S2vtm2wa3I4FyiqpNvqnfxqXh-S3h0sLMBc6zYKF3Jfm5o3bbM9yjvi47QdQA18w2kJwksJa1P4QdbM-woA__z2AhBbvVnqFCmrv4hvwSwxOe8UYHr_GfxOj0kc9pdB90T4LbMg0Ke6TFv_UPpm9WPgAKCy4QcJ7AqTkpvfuoqetdYZb5qJPKu-yk-8YMUYk7SJQDeJimobSCGMAAreUYw-Rb-qaa8WsmLHc52gCt-u3BGKscNhYYjyTKoxfYEBVrCR9dFrxL9nzOPNsXT1qbYNefJDBlh6K9WYd3qjl2byLSIRzZvta0XvfKHaZ-EgzdwXLzymszqODLOab5AwC1sg14vnlGpOdAzbwn9J9FBu0S7jJ-V21j6xYYcNzHICwKw_wdq-ABJLKzZLTbjxbTVb8ARTLt4q8sACoKOa5Pg1-JCPjd2uHWzQ4Hlz9cT3tS2cOe7SXicxUsEHoqQ3zaQot1jIebqvCYHci9nFuRLL=s0');
		imgAry.push('https://lh3.googleusercontent.com/DIyckpQrqj0xgUi-6AnrJuvW_L6LdlLE_xwidJ9zF_dvUOVFdfszLH2XTyH0qm8BLtXCswb39DGW1WHCtMh-fjkILDHXILSg-2K5iYXOXQoeoCZx8IF9veKclPKD3_xAiyNBsjAICVgNwdWuR-krdi-HD2H0krStw82VeRzdzp0NECIjEAFXVqH8mKkLzI7zcKMZEeUxMFs7BTAu8NRTanuTe9_TNk0nasCgogHaXsexUNQJyJ7TS1flg76529-KZ8ePAXqBywB7pHO2ybSkZkTX6LYHjrmNq1ZO3AV58SGvckHBPa2uDVws9axz_LTapyhnQSt8JMOKQ0ynyexWpYDcTqq2JZcHQnH6YvcQWjWECU8_e3w2anVB2-8ASiY3oxAUUQtilH5CotfIfYfgNeZZPoaPMQedwyB5Dbx09gL0VihUMD-iXVFBflU_6jb5RYX6SHzOBKpzN-8Cmk4ucgNG62e9BI-08hOXVwVJ5FVBn9VKZwoFWtgkcoanPldTQ8YcfnX8fKNHa3SJikLDZLFG4QKHjXl66Fm-rzwr7i7JgUl4nghSGtU1jHpzJmyCTiw2FXT_G9MDqvglfoJVE-WRmKMqllMsgYNRQufe8EH38GJ3=s0');
		imgAry.push('https://lh3.googleusercontent.com/_k2QXfXD9SyHabTciJ_heZA9flxB5luCV4hc5a0jd_gKCHSHLPaCd4LwAjulkRa9IuPRiQAYl4T1ZJX-BDowxf9OTT-6VCkzKq5njE2CczS_z9pBvEjeWCCWHtCilv4fTC_Db1-b8Fz0dcAf_TUfQ_aDRmVdMiU-E73MTZT8ORT_4Ikaq9B-7pC3E6TdjlL0HrGUuo29Dbg7YXBc-H6Fpfd3aLej9oOcmMq35wnDTODV8SmYzXqgaulfiUkjO0AEw1HNoakPUvVzNQMQvqQ5k9rjbRdIi1KoURaNvAc5lTxaak3K2Fn2qtSrwcEBk32U62shksfzRaztfqB67iC0eol1C8-GBCCiR7TQU7Gfmr6mX9MkjfMb0tievT4S-ScyEU_HsZtsT6NxnQywbx2_Rn7J0XUbUYUjFTtXWSJCvsgTidNXlNDSiIFTe3NlMJWOecOKDzA_rV7zuH37dsv-p1t2qpUVKG71DvE5ix7RHFzqTNyBzMIDDFr67qjMq8--CWHY4h7uVGBBxHU-X78xaSDKAFUaReLELA1rC8NAyT6NEar1TvHV37d9CXI7OqttkgvsSkMKCQuAE8ltr7-09koomlACwVcCQ0s7H6ACncV8egh8=s0');
		imgAry.push('https://lh3.googleusercontent.com/WjUSxD_5ZEGwoASsXI1tlqTIwRTAAYaPFQODZmSzdiXj8ePuTpCRKeDnTiQTeorC2MvNz8Ma4vsx6v8FrYwmKPkvawfXIpvyWemGT6vnTAcCrzaRUwXOrUemXIYbg4aBtZMcrqKGTJppB3mOB2VV3tDX8wlqYVPv6UeulpQptpKzOrrR2EAtAN--uO_b6nVv-3YZ-u1yL3ouUBLk8VCeB6yc2E2ck9jyW8RG5RiKgTDd1CxzBxwrYMbKvNc6lmBzQwdghDmAjMw8fnZAlcFDWkCYHLY6Bvf5IP7US-0AeL_TPfsCKU_YpzobjwT9N7IuDfscgIUIzm4C3YIGoa-byETjET9ezoDXEw_h2C2wPdUEqBCeBihnUdrBmjVGT0k7Fwm8fWgbUtA8nV5NaUvd5fuPmQL12PSJ2pYd4QyINWV17iJzaoDThNidzNeU_tUOgPT8n2Bii0eCpDZXpGhKaX0TNlLOTsAuN068kbUXckGS0uEwg0uyzAbWdpTNfBSDG9aEY1XzpYVyeKbMbSugfU6eJI2IiDv3F5FsFF1vyiiG-AesqDleBfPr7Js2gVBZpmlMQlBcyntyLdmEFlE9l8aUdgEuXkFqdpxSY2RVqO2QwfVY=s0');

    var rNum = Math.floor((Math.random() * imgAry.length));
    var _img = new Image;
    _img.addEventListener('load', function(){
      clearTimeout(timer);
      timer = null;
      $('.page-header').css({"background-image":"url("+ imgAry[rNum] +")", "opacity":"0"}).animate({opacity: 1}, 'slow');
    });
    _img.addEventListener('error', function() {
      $('.page-header').css({"background-image":"url(" + imgAry[0] + ")", "opacity":"0"}).animate({opacity: 1}, 'slow');
    });
    _img.src = imgAry[rNum];
		log(_img.src); // log writer
    timer = setTimeout(function(){
      clearTimeout(timer);
      timer = null;
      $('.page-header').css({"background-color":"#bbb", "opacity":"0"}).animate({opacity: 1}, 'slow');
      //$('.page-header').css({"background-image":"url('/images/title-background.jpg')", "opacity":"0"}).animate({opacity: 1}, 'slow');
    }, 1000);
  }
})();
