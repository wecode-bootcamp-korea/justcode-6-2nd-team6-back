const { myDataSource } = require("./typeorm-client");

const isGenreIdVaild = async (genreId) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM genres WHERE id=?) as isExist`,
    [genreId],
  );
  const isExist = Object.values(JSON.parse(JSON.stringify(result)))[0].isExist;
  if (isExist == 1) {
    return;
  } else {
    let error = new Error("Error: No Data");
    error.code = 204;
    throw error;
  }
};

let result = {
  cards: {
    genre: [
      {
        id: "1",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/cf603facfcbe45b5acf3421b0843f49a.jpg",
        title: "국내 발라드",
      },
      {
        id: "2",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/5ecae7e786734835a7e396cb657fb597.jpg",
        title: "해외 팝",
      },
      {
        id: "3",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200623/b2c7e8931da2470ab19f48ba82710024.jpg",
        title: "국내 댄스",
      },
      {
        id: "4",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/8eccffe057a1428598f2611592b048c4.jpg",
        title: "국내 알앤비",
      },
      {
        id: "5",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20220214/cbef061870cf416db7a8bc681cf33248.jpg",
        title: "국내 힙합",
      },
      {
        id: "6",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/0358f7914fd14a15ac7b82dcf79bf998.jpg",
        title: "트로트",
      },
      {
        id: "7",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/98254cf67f3c4cb79baf686749c8b30b.jpg",
        title: "해외 알앤비",
      },
      {
        id: "8",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/1f4133f1ca7a41aa86513819d0d50348.jpg",
        title: "해외 힙합",
      },
      {
        id: "9",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/7645502e6c684ac198fb67b8d2e2e5ea.jpg",
        title: "OST",
      },
      {
        id: "10",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200623/3b775e29f3f3460abdd4617b5f33f41a.jpg",
        title: "키즈",
      },
      {
        id: "11",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/02fdfe32c89842e284b6b3c0f017d487.jpg",
        title: "국내 인디",
      },
      {
        id: "12",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/65e4aad6b8d242e9b81a4c22496be6da.jpg",
        title: "클래식",
      },
      {
        id: "13",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/5a6b14075061447590d70bead57756d7.jpg",
        title: "뉴에이지",
      },
      {
        id: "14",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/61c2706252bc4973a726bad9c8817167.jpg",
        title: "재즈",
      },
      {
        id: "15",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200623/f7702092db734c5f874a788c553eb50a.jpg",
        title: "국내 어쿠스틱",
      },
      {
        id: "16",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/37fd6f13154d4847a78c751bd2345c55.jpg",
        title: "국내 블루스",
      },
      {
        id: "17",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/0b60073d4bc64b44bad9cd23823049a0.jpg",
        title: "국내 락/메탈",
      },
      {
        id: "18",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/7557d557256a4634b148799e382cfc2e.jpg",
        title: "해외 일렉트로닉",
      },
      {
        id: "19",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/db803552b4214dcab40f2fff703e4d86.jpg",
        title: "해외 락",
      },
      {
        id: "20",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/f0014cd3831e4dc798b56e90964e810b.jpg",
        title: "해외 메탈",
      },
      {
        id: "21",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/e2353815069d49759c1e5136fc587542.jpg",
        title: "J-POP",
      },
      {
        id: "22",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/35f757f30bbd41019c05bbb80991ca67.jpg",
        title: "맘/태교",
      },
      {
        id: "23",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/6935ec5dbf7b4b8b9d6aa12b95dd2aa0.jpg",
        title: "CCM",
      },
      {
        id: "24",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/03dc834df0e1430d930ca151cea5b7ba.jpg",
        title: "월드뮤직",
      },
      {
        id: "25",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/af59112e90eb488abddf8b8604ddc2e6.jpg",
        title: "국악",
      },
      {
        id: "26",
        category: "장르",
        img: "https://cdn.music-flo.com/poc/p/image/display/genre_rc/20200911/1732255fcb88466bbe2dc06c797cf61d.jpg",
        title: "종교음악",
      },
    ],
    situation: [
      {
        id: "1",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220107/b7ec307c92e74013960fe84b9ef40e92.png",
        title: "플대디",
      },
      {
        id: "2",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220719/71b9fbb926084d62b35b0c0621c3d1f6.jpg",
        title: "월간 뮤직",
      },
      {
        id: "3",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220207/a3be6958de92429696e16458ea25f071.jpg",
        title: "OTT",
      },
      {
        id: "4",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/433c97b5956a4725ab62b5f8617bb225.jpg",
        title: "드라이브",
      },
      {
        id: "5",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220214/5208988c62c843d6be0d61fe8b461e9c.png",
        title: "MBTI",
      },
      {
        id: "6",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/758c7bd109c74685b78a9883faca9edf.jpg",
        title: "공부",
      },
      {
        id: "7",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/69cebced164547c0a3c43701e8d6bd09.jpg",
        title: "사랑",
      },
      {
        id: "8",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/c0b1bc5c1dfd4607968b7c1b13bfab34.jpg",
        title: "이별",
      },
      {
        id: "9",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/2af3fa2789384ed3acba7e00d1878bc4.jpg",
        title: "운동/헬스",
      },
      {
        id: "10",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/29c3d63e260b49049fabff8773faf880.jpg",
        title: "산책/여행",
      },
      {
        id: "11",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/349653e80bdb4f138552e4dcd21bd9f4.jpg",
        title: "아침",
      },
      {
        id: "12",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/32fe720eea7f4daf81c67eb38dfa2112.jpg",
        title: "밤/새벽",
      },
      {
        id: "13",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/475371896cda4e8cb59ed3c64779ba27.jpg",
        title: "카페",
      },
      {
        id: "14",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/a45fde69805845aeae7f1b8b05bd9c43.jpg",
        title: "휴식/힐링",
      },
      {
        id: "15",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/aa12e4f6f4624292baaf7fb9e668a1db.jpg",
        title: "추억/리메이크",
      },
      {
        id: "16",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/d9c2321fa69145abb71526c81b76e096.jpg",
        title: "클럽/파티",
      },
      {
        id: "17",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/0188060f56264bfda0730fadf2057473.jpg",
        title: "출/퇴근",
      },
      {
        id: "18",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/9f42702bdbc548a3a49343c782d51df9.jpg",
        title: "계절/날씨",
      },
      {
        id: "19",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/5285df775bd745ac80229d0c6150da76.jpg",
        title: "혼술/혼밥",
      },
      {
        id: "20",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/6118fbe706a24680b204fb077312d18f.jpg",
        title: "목소리/음색",
      },
      {
        id: "21",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200924/56249dd3bf4440e9ae9c4a54d350e640.jpg",
        title: "내 방",
      },
      {
        id: "22",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/650c821a627d4dea840397874fd229cd.jpg",
        title: "노래방",
      },
      {
        id: "23",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220527/99f45b18022f4b4cbb03043558baac5d.png",
        title: "호텔/라운지",
      },
      {
        id: "24",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201019/6ca3712dcc7e4a6d8c04484173000fc4.jpg",
        title: "공연/아티스트",
      },
      {
        id: "25",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20200827/8eafdfc54f79470d8d6c2d329d7c8aca.jpg",
        title: "자장가",
      },
      {
        id: "26",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220527/b259e4808d524511a7515176c1fa7217.png",
        title: "펍/바",
      },
      {
        id: "27",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220527/7f55ef3cbc26495a86247e2903215ef3.png",
        title: "일/작업",
      },
      {
        id: "28",
        category: "상황",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20211019/0e60f9707ccc4a5fbaf733b85ef27170.png",
        title: "WHO'S",
      },
    ],
    atmosphere: [
      {
        id: "1",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210129/b105c77a776540dcae88674bbce96263.jpg",
        title: "신나는",
      },
      {
        id: "2",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210129/d4f49aaac44d416a8f2915a29c5bf77d.jpg",
        title: "잔잔한",
      },
      {
        id: "3",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/826884cfdd96482e8c657a3ec809e4d6.jpg",
        title: "위로하는",
      },
      {
        id: "",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/7c93ced631e940c1a785aa537386ed2f.jpg",
        title: "감성적인",
      },
      {
        id: "5",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/5e15eb506c0b476dae881b375d155f7a.jpg",
        title: "슬플 때",
      },
      {
        id: "6",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/9b3566572fa549228b4a78a5fa1e3ba0.jpg",
        title: "우울할 떄",
      },
      {
        id: "7",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/124c3282781a4bb18fc5684a6f429282.jpg",
        title: "달달한",
      },
      {
        id: "8",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/c989cd9c8f5945c69e9708ea44c8b4d8.jpg",
        title: "상쾌한",
      },
      {
        id: "9",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/ed66b7d516e94bd5a4f5eb6a2dd9539e.jpg",
        title: "기분전환",
      },
      {
        id: "10",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/b32f711b98184d63be145f52a1dbb14d.jpg",
        title: "트렌디한",
      },
      {
        id: "11",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20210219/b1818d864d5a42c191aa1056109873a3.jpg",
        title: "그루브한",
      },
      {
        id: "12",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/98dbb4daceed40bb9f89947792743f59.jpg",
        title: "파워풀한",
      },
      {
        id: "13",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/baac3b1d5f42443caf68f51cd41f466f.jpg",
        title: "나른한",
      },
      {
        id: "14",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20201126/66d8a7497a9948118cc66b57c14d89ca.jpg",
        title: "몽환적인",
      },
      {
        id: "15",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220527/694225291a784452ab2830fdf616db66.png",
        title: "즐거운",
      },
      {
        id: "16",
        category: "분위기",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220527/a88fe690ef054bcca470cea94454bfb7.png",
        title: "로맨틱한",
      },
    ],
    audio: [
      {
        id: "1",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/6f048cbc6c12467390aeffc1e4022464.png",
        title: "새로 나왔어요",
      },
      {
        id: "2",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/ef83093c5681486398e717d2da06b9c4.png",
        title: "음악",
      },
      {
        id: "3",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/3f0985e4a0f34175898abf8099571c36.png",
        title: "예능",
      },
      {
        id: "4",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/49c9171e368447e489dbb19c024a68e5.png",
        title: "힐링",
      },
      {
        id: "5",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/1864e13441b147608e23bcd68ec64aca.png",
        title: "교양",
      },
      {
        id: "6",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/083e9965367546d8abf86bd447d1e878.png",
        title: "문화",
      },
      {
        id: "7",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/708757d751e84378a923060d1c6731e8.png",
        title: "시사",
      },
      {
        id: "8",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/9b8ce2b8e0cb4c9eb9cfdd8b8ac5723f.png",
        title: "오디오드라마",
      },
      {
        id: "9",
        category: "오디오",
        img: "https://cdn.music-flo.com/poc/p/image/contents/category/20220502/75b3aaf69762443684fd7f3621baf25f.png",
        title: "스포츠",
      },
    ],
  },
};

const getSongsOrderByPlayCount = async () => {
  result.chart = await myDataSource.query(
    `SELECT id AS songId, songTitle, songArtist, albumTitle, albumCover 
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    ORDER BY spcs.total_count DESC`,
  );

  return result;
};

const getSongsByGenreOrderByPlayCount = async (genreId) => {
  result.chart = await myDataSource.query(
    `SELECT sd.id AS songId, songTitle, songArtist, albumTitle, albumCover, g.name AS songGenre
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    LEFT JOIN songs AS s ON sd.id = s.id
    LEFT JOIN genres AS g ON s.genre_id = g.id
    WHERE g.id = ?
    ORDER BY spcs.total_count DESC`,
    [genreId],
  );
  return result;
};

module.exports = {
  isGenreIdVaild,
  getSongsOrderByPlayCount,
  getSongsByGenreOrderByPlayCount,
};
