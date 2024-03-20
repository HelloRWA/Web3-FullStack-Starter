BetToken = 'rxl5oOyCuzrUUVB1edjrcHpcn9s9czhj4rsq4ACQGv4' -- must provid the BetToken Address, here we are $AO token
CRED = 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc'
DepositPID = 'kzcVZhdcZOpM90eeKb-JRX3AG7TGH__S7p5I6PsqA3g'
ArenaPID = 'uLPuyonDbrhNMwL9UA04H9H4dLLE9iPdE0ESAjrWAqs'
bot1PID = 'QcJD9Fzq-gg4LIBHsQs61eTpvlGojW_tg61Il0mp8TI'
bot2PID = 'SkAPEpHCnB3GC8x5yoYMhaOx09G9H--YbzSoOLs4S9U'

function info()
  ao.send({
    Target = CRED,
    Action = 'Info'
  })
end

function getBalance()
  ao.send({
    Target = CRED,
    Action = 'Balance'
  })
end

function getBalance2()
  ao.send({
    Target = BetToken,
    Action = 'Balance'
  })
end

function doDeposit()
  ao.send({
    Target = CRED,
    Action = 'Transfer',
    Recipient = DepositPID,
    Quantity = '100'
  })
end

function doStake()
  ao.send({
    Target = BetToken,
    Action = 'Transfer',
    Stake = ArenaPID,
    Recipient = ArenaPID,
    Quantity = '10000'
  })
end

function doBet1()
  ao.send({
    Target = BetToken,
    Action = 'Transfer',
    BetOn = bot1PID,
    Recipient = ArenaPID,
    Quantity = '10000'
  })
end

function doBet2()
  ao.send({
    Target = BetToken,
    Action = 'Transfer',
    BetOn = bot2PID,
    Recipient = ArenaPID,
    Quantity = '10000'
  })
end

T = setmetatable({}, {
  __index = function(t, key)
    if key == "info" then
      info()
      return "token info requested."
    elseif key == "getBalance" then
      getBalance()
      return "Balance update requested."
    elseif key == "doBet1" then
      doBet1()
      return "doBet1 requested."
    elseif key == "doBet2" then
      doBet2()
      return "doBet2 requested."
    elseif key == "doDeposit" then
      doDeposit()
      return 'doDeposit'
    elseif key == "doStake" then
      doStake()
      return 'doStake'
    else
      return nil
    end
  end
})
