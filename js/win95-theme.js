// Default theme — ПУКДОС 95 (loaded if no theme is pre-set)
if (!window.W95_THEME) {
  window.W95_THEME = {
    id: 'pukdos95',
    name: 'ПУКДОС 95',
    shortName: 'ПУКДОС',
    version: '4.00.950',
    year: '1993',
    startBtn: '💨 Пук',
    startBtnTitle: 'ПУКДОС',
    bootIcon: '💨',
    bootTitle: 'ПУКДОС 95',
    bootSubtitle: 'Microsoft — только не та',
    loginTitle: 'Вход в систему ПУКДОС 95',
    loginFooter: 'ПУКДОС 95 © 1993',
    manufacturer: 'PukProm Inc.',
    biosName: 'ПУКПРОМ BIOS v4.20.69',
    biosLogo: 'PUKPROM SYSTEMS INC.',
    biosTagline: '"Технологии газового превосходства с 1993 года"',
    biosProcessor: 'Pentium Puk(tm) @ 420 MHz',
    biosHDD: 'ПУКПРОМ HDD 420MB',
    biosCDROM: 'CD-ROM ПУКПРОМ x24',
    vfsSysDir: 'PUKDOS95',
    vfsKey: 'pukdos_vfs',
    cpKey: 'pukdos_cp',
    iconsKey: 'pukdos_desktop_icons',
    bootMsgs: [
      'Инициализация пуков...','Загрузка ядра ПУКДОС...','Проверка газовых резервов...',
      'Монтирование дисков...','Синхронизация с ПУКПРОМ...','Запуск рабочего стола...'
    ],
    desktopBg: '#008080',
    titlebarActive: '#000080',
    titlebarText: '#ffffff',
    osColor: '#000080',
    accentColor: '#008080',
    apps: {
      ie: { name: 'ПукПлорер', icon: '🌐' },
      doom: { name: 'ПУКДУМ', icon: '🔫' },
      chat: { name: 'Пук-Чат 2000', icon: '💬' },
      pukmail: { name: 'Пук-Почта', icon: '📧' },
      pukword: { name: 'ПукВорд', icon: '📄' },
      pukexcel: { name: 'ПукЭксель', icon: '📊' },
      pukprez: { name: 'ПукПрез', icon: '📑' },
    }
  };
}
