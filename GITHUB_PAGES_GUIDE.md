# Guia de Publicação no GitHub Pages

## ✅ Status da Publicação

Seu PWA foi publicado com sucesso no GitHub Pages em:
```
https://erik-hebeler.github.io/Cine-Teste/
```

---

## 📋 O que foi feito

1. ✅ Instalado `angular-cli-ghpages` como dependência de desenvolvimento
2. ✅ Identificado projeto Angular: `Cine-Teste` em `angular.json`
3. ✅ Build de produção executado com `--base-href "/Cine-Teste/"`
4. ✅ Deploy publicado na branch `gh-pages`
5. ✅ Adicionado script `deploy` em `package.json`

---

## 🔧 Como Usar Localmente

### Atualizar Node (necessário)
Seu projeto Angular 21 requer Node >= 20.19.0. Use `nvs`:
```powershell
nvs add 22
nvs use node/22.22.3/x64
node --version  # Confirmar v22.x.x
```

### Scripts Disponíveis

```powershell
# Desenvolvimento local
npm start

# Build de produção
npm run build

# Build + Deploy para GitHub Pages
npm run deploy

# Testes
npm test
```

---

## 🚀 Verificação do PWA em Produção

Acesse: https://erik-hebeler.github.io/Cine-Teste/

### Checklist de Verificação

- [ ] **Aplicação carrega** - Página abre normalmente
- [ ] **Service Worker registrado** - Abra DevTools (F12) → Application → Service Workers
- [ ] **Manifest.json presente** - DevTools → Application → Manifest
- [ ] **Offline (offline-first)** - Desative internet (F12 → Network → Offline) e recarregue
- [ ] **Instalável (PWA)** - Clique no ícone de instalação na barra de endereço (se disponível)

### Como Verificar Service Worker

1. Abra a aplicação em: https://erik-hebeler.github.io/Cine-Teste/
2. Pressione **F12** para abrir DevTools
3. Vá para **Application** → **Service Workers**
4. Deve aparecer: `sw.js` ou similar com status **activated and running**
5. Vá para **Application** → **Manifest** para verificar os metadados do PWA

### Possíveis Problemas

**Problema:** Aplicação não aparece
- Verifique se a branch `gh-pages` foi criada no GitHub
- Em Settings → Pages, confirme que está usando branch `gh-pages` e root `/`

**Problema:** PWA não funciona offline
- Verifique `src/ngsw-config.json` - deve listar os arquivos a cachear
- Service worker pode levar alguns minutos para ativar após primeira visita

**Problema:** Erro CORS ou recursos não carregam
- Confirme que `base-href` em `angular.json` ou no build está correto: `/Cine-Teste/`

---

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── Models/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── assets/
├── ngsw-config.json       ← Configuração do Service Worker
├── manifest.json          ← Manifest do PWA
└── styles.scss

angular.json               ← Configuração build (com base-href)
package.json              ← Scripts e dependências
```

---

## 🔄 Próximos Deploys

Para próximas atualizações, execute:
```powershell
npm run deploy
```

Isso vai:
1. Compilar a aplicação em produção
2. Atualizar os arquivos em `dist/Cine-Teste/`
3. Publicar automaticamente na branch `gh-pages`

---

## 📚 Referências

- [Angular PWA Documentation](https://angular.dev/guide/service-workers)
- [GitHub Pages](https://pages.github.com/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

**Última atualização:** 23 de Maio de 2026
